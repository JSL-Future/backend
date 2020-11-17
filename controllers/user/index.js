const { hash } = require('bcrypt')
const UserModel = require('../../database/models/user')

const create = async (req, res, next) => {
  const password = await hash(req.body.password, 10)
  const user = new UserModel({ ...req.body, password })

  try {
    const response = await user.save()
    res.json(response)
  } catch (error) {
    res.json(error)
  }
}

const update = async (req, res, next) => {
  let response
  try {
    if (req.body.password) {
      const password = await hash(req.body.password, 10)
      response = await UserModel.findOneAndUpdate(req.params.id, {
        ...req.body, password,
      }, { new: true })
    } else {
      response = await UserModel.findOneAndUpdate(req.params.id, req.body, { new: true })
    }

    res.json(response)
  } catch (error) {
    res.json(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const response = await UserModel.findById(req.params.id)
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
