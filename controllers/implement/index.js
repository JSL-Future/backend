const ImplementModel = require('../../database/models/implement')

const create = async (req, res, next) => {
  const plate = req.body.plate
  const implement = new ImplementModel(req.body)
  try {
    const findImplement = await ImplementModel.find({ plate, active: true })
    if (findImplement.length > 0) {
      throw new Error(`Allow only one active implement to this plate: ${plate}`)
    }


    const response = await implement.save()
    res.json(response)
  } catch (error) {
    console.log(error.message)
    res.json({ errors: [{ error: error.name, message: error.message }] })
  }
}

const update = async (req, res, next) => {
  try {
    const response = await ImplementModel.findOneAndUpdate(req.params.id, req.body, { new: true })
    res.json(response)
  } catch (error) {
    res.json(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const response = await ImplementModel.findById(req.params.id)
    res.json(response)
  } catch (error) {
    res.json(error)
  }
}

module.exports = {
  create,
  update,
  getById,
}
