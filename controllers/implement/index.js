const { 
  applySpec,
  pathOr,
  isEmpty,
  isNil,
  propOr,
  concat,
  replace,
  pipe
} = require('ramda')
const database = require('../../database')
const ImplementModel = database.model('implement')
const ImplementEventModel = database.model('implement_event')
const removeFiledsNilOrEmpty = require('../../utils')
const Sequelize = require('sequelize')
const { Op } = Sequelize
const { iLike } = Op

const suplySpec = applySpec({
  status: pathOr(null, ['status']),
  fuel: pathOr(null, ['fuel']),
	mileage: pathOr(null, ['mileage']),
	pedometer: pathOr(null, ['pedometer']),
	totalLiters: pathOr(null, ['totalLiters']),
  registrationDriver: pathOr(null, ['registrationDriver']),
})

const toUpperCase = value => value.toUpperCase()
const formattedField = propName => pipe(
  pathOr('', [propName]),
  replace(/[^a-z0-9]/gi, ''),
  toUpperCase
)

const implementSpec = applySpec({
  operation: pathOr(null, ['operation']),
  reason: pathOr(null, ['reason']),
	plate: formattedField('plate'),
	fleet: pipe(
    pathOr('', ['fleet']),
    toUpperCase
  ),
	responsible: pathOr(null, ['responsible']),
})

const include = [
  ImplementEventModel,
]

const attributes = [
  'id',
  'active',
  'status',
  'plate',
  'operation',
  'fleet',
  'reason',
  'priority',
  'fuel',
  'mileage',
  'pedometer',
  'totalLiters',
  'registrationDriver',
  'createdAt',
  'updatedAt',
]

const create = async (req, res, next) => {
  const user = req.decoded.user
  const transaction = await database.transaction()
  const query =  { where: { plate: req.body.plate, active: true } }
  try {

    const findImplement = await ImplementModel.findOne(query)
    if (findImplement) {
      throw new Error(`Allow only one active implement to this plate: ${req.body.plate}`)
    }

    const implementCreated = await ImplementModel.create(implementSpec(req.body), { transaction })
    await ImplementEventModel.create({
      responsible: req.body.responsible,
      userId: user.id,
      implementId: implementCreated.id
    }, { transaction })

    await implementCreated.reload({
      transaction,
      include,
      attributes,
    })

    await transaction.commit()
    res.json(implementCreated)
  } catch (error) {
    await transaction.rollback()
    res.status(400).json({ errors: [{
      error: error.name,
      message: error.message,
    }] })
  }
}

const update = async (req, res, next) => {
  const transaction = await database.transaction()
  const priority = pathOr(null, ['body', 'priority'], req)
  const status = pathOr(null, ['body', 'event'], req)
  const user = pathOr(null, ['decoded','user'], req)
  const implementId = pathOr(null, ['params', 'id'], req)
  const suplyData = suplySpec({...req.body, status })
  const query =  { where: { id: implementId }, attributes }
  let dataFormmated = { status }
  try {
    const findImplement = await ImplementModel.findOne(query)
    const findImplementEventModel = status && await ImplementEventModel.findOne({
      where: {
        implementId,
        status,
      }
    })

    if (!findImplement.active && findImplement.status === 'check-out') {
        throw new Error(
          `Implement is done!`
        )
      }

    if (findImplementEventModel && findImplementEventModel.status === 'check-out') {
      throw new Error(
        `Allow only one status of type \'${findImplementEventModel.status}\'`
      )
    }

    if (findImplementEventModel && findImplementEventModel.status === 'check-in') {
      throw new Error(
        `Allow only one status of type \'${findImplementEventModel.status}\'`
      )
    }

    if (findImplementEventModel && findImplementEventModel.status === 'suply') {
      throw new Error(
        `Allow only one status of type \'${findImplementEventModel.status}\'`
      )
    }

    if (status === 'suply') {
      for (let key in suplyData) {
        if (isEmpty(suplyData[key]) || isNil(suplyData[key])) {
          throw new Error(`field ${key} is required!`)
        }
      }

      dataFormmated = suplyData
    }

    if (priority) {
      dataFormmated = { priority }
    }

    if (status === 'check-out') {
      dataFormmated = { status, active: false }
    }

    await findImplement.update(dataFormmated, { transaction, attributes })

    if (!priority) {
      await ImplementEventModel.create({
        responsible: req.body.responsible || user.name,
        status,
        userId: user.id,
        implementId
      }, { transaction })
    }

    await findImplement.reload({
      transaction,
      include,
      attributes,
    })

    await transaction.commit()
    res.json(findImplement)
  } catch (error) {
    await transaction.rollback()
    res.status(400).json({ errors: [{
      error: error.name,
      message: error.message,
    }] })
  }
}

const getById = async (req, res, next) => {
  try {
    const response = await ImplementModel.findByPk(req.params.id, { include, attributes })
    res.json(response)
  } catch (error) {
    res.status(400).json(error)
  }
}

const iLikeOperation = (propName) => (values) => {
  const propValue = propOr('', propName, values)
  if (isEmpty(propValue)) {
    return null
  }

  return {
    [iLike]: concat(concat('%', propValue), '%')
  }
}

const iLikeOperationPlate = (value) => {
  if (isEmpty(value) || !value) {
    return null
  }

  return {
    [iLike]: concat(concat('%', value), '%')
  }
}

const buildQuery = applySpec({
  status: iLikeOperation('status'),
  plate: pipe(
    pathOr('', ['plate']),
    replace(/[^a-z0-9]/gi, ''),
    iLikeOperationPlate
  ),
  operation: iLikeOperation('operation'),
  fleet: iLikeOperation('fleet'),
  reason: iLikeOperation('reason'),
  priority: iLikeOperation('priority'),
  active: pathOr(null, ['active']),
})

const getAll = async (req, res, next) => {
  const where = removeFiledsNilOrEmpty(buildQuery(pathOr({}, ['query'], req)))
  try {
    const response = await ImplementModel.findAll({ where, include, attributes, order: [['createdAt', 'DESC']] })
    res.json(response)
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  create,
  update,
  getById,
  getAll,
}
