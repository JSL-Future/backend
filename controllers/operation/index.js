const { pathOr } = require('ramda')
const database = require('../../database')
const OperationModel = database.model('operation')
const CompanyModel = database.model('company')

const create = async (req, res, next) => {
  const userId = pathOr(null, ['decoded', 'user', 'id'], req)

  try {
    const findOperation = await OperationModel.findOne({ where: { name: req.body.name, companyId: req.body.companyId }})
    if (findOperation) {
      throw new Error('Allow only one operation with this name for company!')
    }
    const response = await OperationModel.create({...req.body, userId }, { include: [CompanyModel] })
    res.json(response)
  } catch (error) {
    
    res.status(400).json({ error: error.message })
  }
}

const update = async (req, res, next) => {
  try {
    const findUser = await OperationModel.findByPk(req.params.id, { include: [CompanyModel] })
    await findUser.update(req.body)
    const response = await findUser.reload()
    res.json(response)
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getById = async (req, res, next) => {
  try {
    const response = await OperationModel.findByPk(req.params.id, { include: [CompanyModel] })
    res.json(response)
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getAll = async (req, res, next) => {
  try {
    const response = await OperationModel.findAll({ include: [CompanyModel] })
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
