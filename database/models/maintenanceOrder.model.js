const Sequelize = require('sequelize')

const MaintenanceOrder = (sequelize) => {
  const MaintenanceOrder = sequelize.define('maintenanceOrder', {
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
    plateHorser: {
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
  })
  
  MaintenanceOrder.associate = (models) => {
    models.maintenanceOrder.belongsTo(models.company, {
      foreignKey: {
        allowNull: false,
      }
    })

    models.maintenanceOrder.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      }
    })

    models.maintenanceOrder.belongsTo(models.operation, {
      foreignKey: {
        allowNull: false,
      }
    })

    models.maintenanceOrder.hasMany(models.maintenanceOrderEvent, {
      foreignKey: {
        allowNull: false,
      }
    })

    models.maintenanceOrder.hasMany(models.supply, {
      foreignKey: {
        allowNull: false,
      }
    })
  }

  return MaintenanceOrder
}

module.exports = MaintenanceOrder
