'use strict'
const sequelizeReplaceEnum = require('sequelize-replace-enum-postgres')
const replaceEnum = sequelizeReplaceEnum.default

const tableName = 'implements'

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
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
        'suply'
      ],
      enumName: 'enum_implements_status'
    }),
    queryInterface.addColumn(tableName, 'priority', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
    queryInterface.addColumn(tableName, 'fuel', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
    queryInterface.addColumn(tableName, 'mileage', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
    queryInterface.addColumn(tableName, 'pedometer', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
    queryInterface.addColumn(tableName, 'totalLiters', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
    queryInterface.addColumn(tableName, 'registrationDriver', {
      type: Sequelize.STRING,
      allowNull: true,
    }),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    replaceEnum({
      queryInterface,
      tableName,
      columnName: 'status',
      defaultValue: 'check-in',
      newValues: [
        'check-in',
        'check-out',
      ],
      enumName: 'enum_implements_status'
    }),
    queryInterface.removeColumn(tableName, 'registrationDriver'),
    queryInterface.removeColumn(tableName, 'totalLiters'),
    queryInterface.removeColumn(tableName, 'fuel'),
    queryInterface.removeColumn(tableName, 'mileage'),
    queryInterface.removeColumn(tableName, 'pedometer'),
  ])
}
