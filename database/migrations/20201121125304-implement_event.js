'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('implement_events', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
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
    implementId: {
      type: Sequelize.UUID,
      references: {
        model: 'implements',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'restrict',
    },
    responsible: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM(['check-in', 'check-out']),
      allowNull: false,
      defaultValue: 'check-in',
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
  down: (queryInterface) => queryInterface.dropTable('implement_events')
};