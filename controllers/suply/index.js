const database = require('../../database')
const SuplyModel = database.model('suply')

const getAll = async (req, res, next) => {
  try {
    const response = await SuplyModel.findAndCountAll()
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(404).json(error)
  }
}

const createSuply = async (req, res, next) => {
  try {
    const response = await SuplyModel.create(req.body)
    res.json(response)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const response = await SuplyModel.findByPk(req.params.id)
    res.json(response)
  } catch (error) {
    res.status(404).json(error)
  }
}

const update = async (req, res, next) => {
  try {
    const response = await SuplyModel.findByPk(req.params.id)
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
  createSuply,
  update
}
