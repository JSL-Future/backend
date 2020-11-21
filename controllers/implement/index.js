const database = require('../../database')
const ImplementModel = database.model('implement')
const ImplementEventModel = database.model('implement_event')
const UserModel = database.model('user')

const include = [
  ImplementEventModel,
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

    await implementCreated.reload({
      transaction,
      include,
    })

    await transaction.commit()
    res.json(implementCreated)
  } catch (error) {
    await transaction.rollback()
    res.status(400).json({ errors: [{ error: error.name, message: error.message }] })
  }
}

const update = async (req, res, next) => {
  const status = 'check-out'
  const user = req.decoded.user
  const transaction = await database.transaction()
  const query =  { where: { id: req.params.id, active: true, status: 'check-out' } }
  try {

    const findImplement = await ImplementModel.findOne(query)
    await findImplement.update({ status, active: false }, { transaction })
    await ImplementEventModel.create({
      responsible: req.body.responsible || user.name,
      status,
      userId: user.id,
      implementId: findImplement.id
    }, { transaction })

    await findImplement.reload({
      transaction,
      include,
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
    const response = await ImplementModel.findByPk(req.params.id, { include })
    res.json(response)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const response = await ImplementModel.findAll({ include })
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
