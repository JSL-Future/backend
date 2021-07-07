'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('maintenanceOrders', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    activated: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    driverMain:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    driverPhoneMain:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    driverMainLicense: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    driverSecondaryLicense: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    driverPhoneSecondary:{
      type: Sequelize.STRING,
      allowNull: true,
    },
    driverSecondary:{
      type: Sequelize.STRING,
      allowNull: true,
    },
    plateHorse: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    plateCart: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    maintenanceDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    costCenter: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    priority: {
      type: Sequelize.ENUM(['low', 'medium', 'high']),
      allowNull: false,
      defaultValue: 'low',
    },
    service: {
      type: Sequelize.ENUM(['preventive', 'corrective']),
      allowNull: false,
      defaultValue: 'preventive',
    },
    serviceDescription: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM([
        'solicitation',
        'check-in',
        'avaiable',
        'parking',
        'courtyard',
        'awaiting_repair',
        'dock',
        'wash',
        'supply',
        'check-out',
      ]),
      allowNull: false,
      defaultValue: 'solicitation',
    },
    operationId: {
      type: Sequelize.UUID,
      references: {
        model: 'operations',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'restrict',
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'restrict',
    },
    companyId: {
      type: Sequelize.UUID,
      references: {
        model: 'companies',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'restrict',
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('maintenanceOrders')
};