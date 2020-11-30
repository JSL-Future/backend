const { applySpec, pathOr, isEmpty, isNil, path } = require('ramda')
const database = require('../../database')
const ImplementModel = database.model('implement')
const ImplementEventModel = database.model('implement_event')

const suplySpec = applySpec({
  fuel: pathOr(null, ['fuel']),
	mileage: pathOr(null, ['mileage']),
	pedometer: pathOr(null, ['pedometer']),
	totalLiters: pathOr(null, ['totalLiters']),
  registrationDriver: pathOr(null, ['registrationDriver']),
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

    const implementCreated = await ImplementModel.create(req.body, { transaction })
    await ImplementEventModel.create({
      responsible: req.body.responsible,
      userId: user.id,
      implementId: implementCreated.id
    }, { transaction })
    console.log(implementCreated)
    await implementCreated.reload({
      transaction,
      include,
      attributes,
    })

    await transaction.commit()
    res.json(implementCreated)
  } catch (error) {
    await transaction.rollback()
    res.status(400).json({ errors: [{ error: error.name, message: error.message }] })
  }
}

const update = async (req, res, next) => {
  const priority = pathOr(null, ['body', 'priority'], req)
  const status = pathOr(null, ['body', 'event'], req)
  let dataFormmated = { status }
  const user = pathOr(null, ['decoded','user'], req)
  const transaction = await database.transaction()
  const implementId = pathOr(null, ['params', 'id'], req)
  const query =  { where: { id: implementId, active: true }, attributes }
  const suplyData = suplySpec(req.body)

  try {
    const findImplement = await ImplementModel.findOne(query)
    const findImplementEventModel = await ImplementEventModel.findOne({
      implementId,
      status,
    })

    if (
        findImplementEventModel.status === 'check-out'
        // || findImplementEventModel.status === 'check-in'
      ) {
      throw new Error('Allow only one status of type \'check-out\'')
    }


    if (status === 'suply') {
      for (let key in suplyData) {
        if (isEmpty(suplyData[key]) || isNil(suplyData[key])) {
          throw new Error(`field ${key} is required!`)
        }
      }

      dataFormmated = {
        ...suplyData,
        status: 'check-in',
      }
    }

    if (priority) {
      dataFormmated = { priority }
    }

    await findImplement.update(dataFormmated, { transaction, attributes })
    await ImplementEventModel.create({
      responsible: req.body.responsible || user.name,
      status: 'check-in',
      userId: user.id,
      implementId
    }, { transaction })

    await findImplement.reload({
      transaction,
      include,
      attributes,
    })

    await transaction.commit()
    res.json(findImplement)
  } catch (error) {
    await transaction.rollback()
    res.status(400).json({ errors: [{ error: error.name, message: error.message }] })
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

const getAll = async (req, res, next) => {
  try {
    const response = await ImplementModel.findAll({ include, attributes })
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
