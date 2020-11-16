const mongoose = require('mongoose')
const _db = require('../')
const { set } = require('../..')

const UserSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    enum: ['check-in', 'check-out'],
    default: 'check-in',
  },
  plate: {
    type: String,
    required: [true, "field required!"],
  },
  fleet: {
    type: String,
    required: [true, "field required!"],
  },
  events: {
    type: [{
      status: {
        type: String,
        enum: ['check-in', 'check-out'],
      },
      responsible: {
        type: String,
        required: [true, "field required!"],
      },
      createdAt: {
        type: String,
        required: [true, "field required!"],
        default: new Date(),
      },
      userId: {
        type: String,
        required: [true, "field required!"],
      },
      updatedAt: {
        type: String,
        required: [true, "field required!"],
        default: new Date(),
      },
      updatedBy: {
        type: String,
        required: [true, "field required!"],
      }
    }],
    default: []
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


module.exports = _db.model('implements', UserSchema)
