const UserModel = require('../../database/models/user')

const create = async (req, res, next) => {
  const user = new UserModel(req.body)
  try {
    const response = await user.save()
    res.json(response)
  } catch (error) {
    res.json(error)
  }
}

const update = async (req, res, next) => {
  try {
    const response = await UserModel.findOneAndUpdate(req.params.id, req.body, { new: true })
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
