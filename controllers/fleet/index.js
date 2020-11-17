const FleetModel = require('../../database/models/fleet')

const create = async (req, res, next) => {
  const fleet = new FleetModel(req.body)
  try {
    const response = await fleet.save()
    res.json(response)
  } catch (error) {
    res.json(error)
  }
}

const update = async (req, res, next) => {
  try {
    const response = await FleetModel.findOneAndUpdate(req.params.id, req.body, { new: true })
    res.json(response)
  } catch (error) {
    res.json(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const response = await FleetModel.findById(req.params.id)
    res.json(response)
  } catch (error) {
    res.json(error)
  }
}

const getAll = async (req, res, next) => {
  // const plate = req.params
  try {
    const response = await FleetModel.find({})
    res.json(response)
  } catch (error) {
    res.json(error)
  }
}

module.exports = {
  create,
  update,
  getById,
  getAll,
}
