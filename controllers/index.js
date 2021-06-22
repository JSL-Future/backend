const AuthenticationController = require('./authentication')
const userController = require('./user')
const implementController = require('./implement')
const companyController = require('./company')
const solicitationController = require('./solicitation')
const suplyController = require('./suply')

module.exports = {
  AuthenticationController,
  companyController,
  userController,
  implementController,
  solicitationController,
  suplyController
}
