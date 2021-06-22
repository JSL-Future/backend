const database = require('../../database')
const SolicitationModel = database.model('solicitation')

const getAll = async (req, res, next) => {
  try {
    const response = await SolicitationModel.findAndCountAll()
    res.json(response)
  } catch (error) {
    res.status(404).json(error)
  }
}

const createSolicitation = async (req, res, next) => {
  try {
    const response = await SolicitationModel.create(req.body)
    res.json(response)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const response = await SolicitationModel.findByPk(req.params.id)
    res.json(response)
  } catch (error) {
    res.status(404).json(error)
  }
}

const update = async (req, res, next) => {
  try {
    const response = await SolicitationModel.findByPk(req.params.id)
    await response.update(req.body)
    await response.reload()
    res.json(response)
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = {
  getAll,
  getById,
  createSolicitation,
  update
}
