const database = require('../../database')
const CompanyModel = database.model('company')

const getAll = async (req, res, next) => {
  try {
    const response = await CompanyModel.findAndCountAll()
    res.json(response)
  } catch (error) {
    res.status(404).json(error)
  }
}

const createCompany = async (req, res, next) => {
  try {
    const response = await CompanyModel.create(req.body)
    res.json(response)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const response = await CompanyModel.findByPk(req.params.id)
    res.json(response)
  } catch (error) {
    res.status(404).json(error)
  }
}

const update = async (req, res, next) => {
  try {
    const response = await CompanyModel.findByPk(req.params.id)
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
  createCompany,
  update
}
