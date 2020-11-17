const mongoose = require('mongoose')
const _db = require('../')

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
  operation: {
    type: String,
    required: [true, "field required!"],
  },
  fleet: {
    type: String,
    required: [true, "field required!"],
  },
  reason: {
    type: String,
    required: [true, "field required!"],
  },
  events: {
    type: [{
      status: {
        type: String,
        enum: ['check-in', 'check-out'],
        required: [true, "field required!"],
        default: 'check-in',
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
