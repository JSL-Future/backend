'use strict'
const sequelizeReplaceEnum = require('sequelize-replace-enum-postgres')
const replaceEnum = sequelizeReplaceEnum.default
const tableName = 'implement_events'

module.exports = {
  up: (queryInterface, Sequelize) =>
    replaceEnum({
      queryInterface,
      tableName,
      columnName: 'status',
      defaultValue: 'check-in',
      newValues: [
        'check-in',
        'check-out',
        'courtyard',
        'washing',
        'awaiting_repair',
        'dock',
        'suply',
      ],
      enumName: 'enum_implement_events_status'
    }),

  down: (queryInterface) =>
    replaceEnum({
      queryInterface,
      tableName,
      columnName: 'status',
      defaultValue: 'check-in',
      newValues: [
        'check-in',
        'check-out',
      ],
      enumName: 'enum_implement_events_status'
    }),
}
