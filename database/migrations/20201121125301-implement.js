'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('implements', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    status: {
      type: Sequelize.ENUM(['check-in', 'check-out']),
      allowNull: false,
      defaultValue: 'check-in',
    },
    plate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    operation: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fleet: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    reason: {
      type: Sequelize.STRING,
      allowNull: false,
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
  down: (queryInterface) => queryInterface.dropTable('implements')
};