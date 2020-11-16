const mongoose = require('mongoose')
const _db = require('../')

const UserSchema = new mongoose.Schema({
  plate: {
    type: String,
    required: [true, "field required!"],
    unique: true,
  },
  fleet: {
    type: String,
    required: [true, "field required!"],
  },
  createdBy: {
    type: String,
    required: [true, "field required!"],
  },
  updatedBy: {
    type: String,
    required: [true, "field required!"],
  },
  createdAt: {
    type: String,
    required: [true, "field required!"],
    default: new Date(),
  },
  updatedAt: {
    type: String,
    required: [true, "field required!"],
    default: new Date(),
  },
})


module.exports = _db.model('fleets', UserSchema)
