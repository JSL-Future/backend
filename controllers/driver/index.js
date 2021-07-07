const { pathOr } = require('ramda')
const database = require('../../database')
const DriverModel = database.model('driver')
const Sequelize = require('sequelize')
const { Op } = Sequelize
const { iLike } = Op

const create = async (req, res, next) => {
  const userId = pathOr(null, ['decoded', 'user', 'id'], req)
  const companyId = pathOr(null, ['decoded', 'user', 'companyId'], req)

  try {
    const response = await DriverModel.create({...req.body, userId, companyId }, { include: [] })
    res.json(response)
  } catch (error) {
    
    res.status(400).json({ error: error.message })
  }
}

const update = async (req, res, next) => {
  try {
    const findUser = await DriverModel.findByPk(req.params.id, { include: [] })
    await findUser.update(req.body)
    const response = await findUser.reload()
    res.json(response)
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getById = async (req, res, next) => {
  try {
    const response = await DriverModel.findByPk(req.params.id, { include: [] })
    res.json(response)
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getAll = async (req, res, next) => {
  const limit = pathOr(20, ['query', 'limit'], req)
  const offset = pathOr(0, ['query', 'offset'], req)
  const driverLicense = pathOr(null, ['query', 'driverLicense'], req)
  const name = pathOr(null, ['query', 'name'], req)
  const isDriverLicense = driverLicense ? { driverLicense: { [iLike]: '%' + driverLicense + '%' } } : null
  const isName = name ? { name: { [iLike]: '%' + name + '%' } } : null
  let where = {}
  
  if (isDriverLicense) {
    where = isDriverLicense
  }

  if (isName) {
    where = isName
  }


  try {
    const response = await DriverModel.findAll({ where, limit, offset })
    res.json(response)
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports = {
  create,
  update,
  getById,
  getAll,
}
