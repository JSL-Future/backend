const Sequelize = require('sequelize')

const DriverIncident = (sequelize) => {
  const DriverIncident = sequelize.define('driverIncident', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    incidentDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    incidentDescription: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    incidentType: {
      type: Sequelize.ENUM([
        'accident',
        'collision',
        'vehicle_break_down',
      ]),
      allowNull: false,
    },
  })
  
  DriverIncident.associate = (models) => {
    models.driverIncident.belongsTo(models.company, {
      foreignKey: {
        allowNull: false,
      }
    })

    models.driverIncident.belongsTo(models.driver, {
      foreignKey: {
        allowNull: false,
      }
    })

    models.driverIncident.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      }
    })

    models.driverIncident.belongsTo(models.vehicle, {
      foreignKey: {
        allowNull: false,
      }
    })

    models.driverIncident.belongsTo(models.operation, {
      foreignKey: {
        allowNull: false,
      }
    })

  }

  return DriverIncident
}

module.exports = DriverIncident
