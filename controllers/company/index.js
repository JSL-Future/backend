const database = require('../../database')
const CompanyModel = database.model('company')

const Sequelize = require('sequelize')
const { Op } = Sequelize
const { iLike } = Op

const getAll = async (req, res, next) => {
  const limit = pathOr(20, ['query', 'limit'], req)
  const offset = pathOr(0, ['query', 'offset'], req)
  const document = pathOr(null, ['query', 'document'], req)
  const name = pathOr(null, ['query', 'name'], req)
  const isDocument = document ? { document: { [iLike]: '%' + document + '%' } } : null
  const isName = name ? { name: { [iLike]: '%' + name + '%' } } : null
  let where = {}
  
  if (isDocument) {
    where = isDocument
  }

  if (isName) {
    where = isName
  }

  try {
    const response = await CompanyModel.findAndCountAll({ where, limit, offset })
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
