const { hash } = require('bcrypt')
const database = require('../../database')
const UserModel = database.model('user')

const create = async (req, res, next) => {
  const password = await hash('123456', 10)
  try {
    const response = await UserModel.create({ ...req.body, password })
    res.json(response)
  } catch (error) {
    res.status(400).json({ error })
  }
}

const update = async (req, res, next) => {
  try {
    const findUser = await UserModel.findByPk(req.params.id)
    await findUser.update(req.body)
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

module.exports = {
  create,
  update,
  getById,
  getAll,
}
