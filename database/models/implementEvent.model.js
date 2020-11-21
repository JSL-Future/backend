const Sequelize = require('sequelize')

const ImplementEvent = (sequelize) => {
  const ImplementEvent = sequelize.define('implement_event', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
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
  })

  ImplementEvent.associate = (models) => {
    models.implement_event.belongsTo(models.implement, {
      foreignKey: {
        allowNull: false,
      }
    })

    models.implement_event.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      }
    })
  }

  return ImplementEvent
}

module.exports = ImplementEvent
