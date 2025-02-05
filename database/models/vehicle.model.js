const Sequelize = require('sequelize')

const Vehicle = (sequelize) => {
  const Vehicle = sequelize.define('vehicle', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    plate: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    fleet: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    preventiveMaintenanceLimite: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 6
    },
    lastMaintenance: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    situation: {
      type: Sequelize.ENUM(['regular', 'unregular']),
      allowNull: false,
      defaultValue: 'regular',
    },
  })
  
  Vehicle.associate = (models) => {
    models.vehicle.belongsTo(models.company, {
      foreignKey: {
        allowNull: false,
      }
    })

    models.vehicle.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      }
    })

    models.vehicle.belongsTo(models.vehicleType, {
      foreignKey: {
        allowNull: false,
      }
    })
  }

  return Vehicle
}

module.exports = Vehicle
