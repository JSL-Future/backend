const { pathOr } = require('ramda')
const database = require('../../database')
const MaintenanceOrderModel = database.model('maintenanceOrder')
const MaintenanceOrderEventModel = database.model('maintenanceOrderEvent')
const SupplyModel = database.model('supply')
const CompanyModel = database.model('company')
const DriverModel = database.model('driver')
const Sequelize = require('sequelize')
const { Op } = Sequelize
const { or, and } = Op

const statusQuantityAllow = {
  'cancel': 1,
  'solicitation': 1,
  'check-in': 1,
  'avaiable': 1,
  'parking': 4,
  'courtyard': 10,
  'awaiting_repair': 10,
  'dock': 10,
  'wash': 1,
  'supply': 2,
  'check-out': 1,
}

const create = async (req, res, next) => {
  const userId = pathOr(null, ['decoded', 'user', 'id'], req)
  const companyId = pathOr(null, ['decoded', 'user', 'companyId'], req)
  const plateHorse = pathOr(null, ['body', 'plateHorse'], req)
  const plateCart = pathOr(null, ['body', 'plateHorse'], req)

  const transaction = await database.transaction()
  try {
    const findOrder = await MaintenanceOrderModel.findOne({ where: {
      [and]: [
        { plateHorse },
        { plateCart },
        { activated: true },
      ]
    }})

    if (findOrder) {
      throw new Error ('Allow only one order for these plates!')
    }

    const payload = await MaintenanceOrderModel.create({...req.body, userId }, { include:[MaintenanceOrderEventModel, CompanyModel], transaction })
    const response = await MaintenanceOrderModel.findByPk(payload.id, { include:[MaintenanceOrderEventModel, CompanyModel], transaction })
    await MaintenanceOrderEventModel.create({ userId, companyId, maintenanceOrderId: payload.id }, { transaction })
    await response.reload({ include: [MaintenanceOrderEventModel, CompanyModel], transaction })
    await transaction.commit()

    res.json(response)
  } catch (error) {
    await transaction.rollback()
    res.status(400).json({ error: error.message })
  }
}

const update = async (req, res, next) => {
  try {
    const findUser = await MaintenanceOrderModel.findByPk(req.params.id, { include: [CompanyModel, MaintenanceOrderEventModel]})
    await findUser.update(req.body)
    const response = await findUser.reload({ include: [CompanyModel, MaintenanceOrderEventModel]})
    res.json(response)
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getById = async (req, res, next) => {
  try {
    const response = await MaintenanceOrderModel.findByPk(req.params.id, { include: [CompanyModel, MaintenanceOrderEventModel, SupplyModel]})
    res.json(response)
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getAll = async (req, res, next) => {
  const limit = pathOr(20, ['query', 'limit'], req)
  const offset = pathOr(0, ['query', 'offset'], req)
  const plate = pathOr(null, ['query', 'plate'], req)
  const isPlate = plate ? {
    [or]: [
      { plateHorse: plate },
      { plateCart: plate }
    ]
  } : null
  let where = {}

  if (isPlate) {
    where = isPlate
  }

  try {
    const response = await MaintenanceOrderModel.findAndCountAll({ where, include: [CompanyModel, MaintenanceOrderEventModel], offset, limit })
    res.json(response)
  } catch (error) {
    res.status(400).json({ error })
  }
}

const createEventToMaintenanceOrder =  async (req, res, next) => {
  const maintenanceOrderId = pathOr(null, ['params', 'id'], req)
  const userId = pathOr(null, ['decoded', 'user', 'id'], req)
  const companyId = pathOr(null, ['decoded', 'user', 'companyId'], req)
  const status = pathOr(null, ['body', 'status'], req)
  const driverId = pathOr(null, ['body', 'driverId'], req)
  const transaction = await database.transaction()
  let payload = pathOr({}, ['body'], req)

  try { 
    const findDriver = await DriverModel.findByPk(driverId)
    const response = await MaintenanceOrderModel.findByPk(maintenanceOrderId, { include: [MaintenanceOrderEventModel, SupplyModel], transaction })
    const eventsCreated = await MaintenanceOrderEventModel.count({ where: { status, maintenanceOrderId }})
    
    if (eventsCreated === statusQuantityAllow[status]) {
      throw new Error(`Allow only ${statusQuantityAllow[status]} to the event ${status}`)
    }
    
    await MaintenanceOrderEventModel.create({ userId, companyId, maintenanceOrderId, status }, { transaction })

    if (status === 'check-out' && response.driverMainLicense !== findDriver.driverLicense) {
      payload = {
        ...payload,
        driverPhoneSecondary: findDriver.phone,
        driverSecondary: findDriver.name,
        driverSecondaryLicense: findDriver.driverLicense
      }
    }

    if (status === 'check-out') {
      payload = {
        ...payload,
        activated: false,
      }
    }

    if (status === 'supply') {
      await SupplyModel.create({...req.body, maintenanceOrderId, userId, companyId }, { transaction })
    }
    
    await response.update(payload, { transaction })
    await response.reload({ transaction })
    await transaction.commit()
    res.json(response)
  } catch (error) {
    await transaction.rollback()
    res.status(400).json({ error: error.message })
  }
}

const getByIdMobile = async (req, res, next) => {
  try {
    const response = await MaintenanceOrderModel.findByPk(req.params.id, { include: [CompanyModel]})
    res.json({response: response, passou: 'ok passou' })
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports = {
  create,
  update,
  getById,
  getAll,
  createEventToMaintenanceOrder,
  getByIdMobile,
}
