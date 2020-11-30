'use strict'
const sequelizeReplaceEnum = require('sequelize-replace-enum-postgres')
const replaceEnum = sequelizeReplaceEnum.default
const tableName = 'implements'

module.exports = {
  up: (queryInterface, Sequelize) =>
  replaceEnum({
    queryInterface,
    tableName,
    columnName: 'priority',
    defaultValue: 'medium',
    newValues: ['low', 'medium', 'high'],
    enumName: 'enum_implements_priority'
  }),

  down: (queryInterface) =>
    queryInterface.removeColumn(tableName, 'priority')
}
