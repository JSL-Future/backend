const { pathOr } = require('ramda')
const database = require('../../database')
const MaintenanceOrderModel = database.model('maintenanceOrder')
const MaintenanceOrderEventModel = database.model('maintenanceOrderEvent')
const SupplyModel = database.model('supply')
const CompanyModel = database.model('company')
const create = async (req, res, next) => {
  const userId = pathOr(null, ['decoded', 'user', 'id'], req)
  const companyId = pathOr(null, ['decoded', 'user', 'companyId'], req)

  const transaction = await database.transaction()
  try {
    const payload = await MaintenanceOrderModel.create({...req.body, userId }, { include:[MaintenanceOrderEventModel, CompanyModel], transaction })
    const response = await MaintenanceOrderModel.findByPk(payload.id, { include:[MaintenanceOrderEventModel, CompanyModel], transaction })
    await MaintenanceOrderEventModel.create({ userId, companyId, maintenanceOrderId: payload.id }, { transaction })
    await response.reload({ include: [MaintenanceOrderEventModel, CompanyModel]})
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
    const response = await MaintenanceOrderModel.findByPk(req.params.id, { include: [CompanyModel, MaintenanceOrderEventModel]})
    res.json(response)
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getAll = async (req, res, next) => {
  try {
    const response = await MaintenanceOrderModel.findAll({ include: [CompanyModel, MaintenanceOrderEventModel]})
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

  const transaction = await database.transaction()
  try { 
    const response = await MaintenanceOrderModel.findByPk(maintenanceOrderId, { include: [MaintenanceOrderEventModel], transaction })
    await MaintenanceOrderEventModel.create({ userId, companyId, maintenanceOrderId, status }, { transaction })
    

    if (status === 'supply') {
      await SupplyModel.create(req.body, { transaction })
    }
    
    await response.update(req.body, { transaction })
    await response.reload({ transaction })
    await transaction.commit()
    res.json(response)
  } catch (error) {
    await transaction.rollback()
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  create,
  update,
  getById,
  getAll,
  createEventToMaintenanceOrder,
}
