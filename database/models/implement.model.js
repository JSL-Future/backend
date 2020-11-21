const Sequelize = require('sequelize')

const Implement = (sequelize) => {
  const Implement = sequelize.define('implement', {
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
  })

  Implement.associate = (models) => {
    models.implement.hasMany(models.implement_event, {
      foreignKey: {
        allowNull: false,
      }
    })
  }

  return Implement
}

module.exports = Implement
