const {
  pathOr,
  prop,
  propOr,
} = require('ramda')
const ImplementModel = require('../../database/models/implement')

const create = async (req, res, next) => {
  const plate = pathOr('', ['body', 'plate'], req)
  const user = req.decoded.user

  const formattedImplement = {
    operation: prop('operation', req.body),
    reason: prop('reason', req.body),
    plate,
    fleet: prop('fleet', req.body),
    events: [{
      responsible: prop('responsible', req.body),
      userId: prop('_id', user),
      createdBy: prop('name', user),
      updatedBy: prop('name', user),
    }],
    createdBy: prop('name', user),
    updatedBy: prop('name', user),
  }

  const implement = new ImplementModel(formattedImplement)

  try {
    const findImplement = await ImplementModel.find({ plate, active: true })
    if (findImplement.length > 0) {
      throw new Error(`Allow only one active implement to this plate: ${plate}`)
    }

    const response = await implement.save()
    res.json(response)
  } catch (error) {
    res.status(400).json({ errors: [{ error: error.name, message: error.message }] })
  }
}

const update = async (req, res, next) => {
  const query = { _id: req.params.id, active: true }
  const user = req.decoded.user

  const implementData = {
    active: false,
    status: prop('status', req.body),
    updatedBy: prop('name', user),
    updatedAt: new Date(),
    $addToSet: {
      events: [{
        responsible: propOr(user.name, 'responsible', req.body),
        userId: prop('_id', user),
        createdBy: prop('name', user),
        updatedBy: prop('name', user),
        status: prop('status', req.body),
      }],
    },
  }

  try {
    const response = await ImplementModel.findOneAndUpdate(
      query,
      implementData,
      { new: true }
    )

    res.json(response)
  } catch (error) {
     res.status(400).json({ errors: [{ error: error.name, message: error.message }] })
  }
}

const getById = async (req, res, next) => {
  try {
    const response = await ImplementModel.findById(req.params.id)
    res.json(response)
  } catch (error) {
     res.status(400).json({ errors: [{ error: error.name, message: error.message }] })
  }
}

const getAll = async (req, res, next) => {
  try {
    const response = await ImplementModel.find({})
    res.json(response)
  } catch (error) {
    res.status(400).json({ errors: [{ error: error.name, message: error.message }] })
  }
}

module.exports = {
  create,
  update,
  getById,
  getAll,
}
