const { hash } = require('bcrypt')
const { omit, pathOr } = require('ramda')
const database = require('../../database')
const UserModel = database.model('user')

const create = async (req, res, next) => {
  const companyId = pathOr(null, ['decoded', 'user', 'companyId'], req)
  const password = await hash('123456', 10)
  try {
    const response = await UserModel.create({ ...req.body, password, companyId })
    res.json(response)
  } catch (error) {
    res.status(400).json({ error })
  }
}

const update = async (req, res, next) => {
  const payload = omit(['password'], req.body)
  try {
    const findUser = await UserModel.findByPk(req.params.id)
    await findUser.update(payload)
    const response = await findUser.reload()
    res.json(response)
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getById = async (req, res, next) => {
  try {
    const response = await UserModel.findByPk(req.params.id)
    res.json(response)
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getAll = async (req, res, next) => {
  try {
    const response = await UserModel.findAll()
    res.json(response)
  } catch (error) {
    res.status(400).json({ error })
  }
}

const updatePassword = async (req, res, next) => {
  const password = await hash(req.body.password, 10)
  try {
    const findUser = await UserModel.findByPk(req.body.id)
    const checkedPassword = await compare(req.body.password, findUser.password)

    if(!checkedPassword) {
      throw new Error('Username or password do not match')
    }

    await findUser.update({ password })
    await findUser.reload()

    res.json(findUser)
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports = {
  create,
  update,
  getById,
  getAll,
  updatePassword,
}
