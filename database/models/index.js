const User = require('./user.model')
const Implement = require('./implement.model')
const ImplementEvent = require('./implementEvent.model')
const Company = require('./company.model')
const Solicitation = require('./solicitation.model')
const Suply = require('./suply.model')

module.exports = [
  Company,
  User,
  Implement,
  ImplementEvent,
  Solicitation,
  Suply
]
