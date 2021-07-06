const Sequelize = require('sequelize')

const Driver = (sequelize) => {
  const Driver = sequelize.define('driver', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    driverLicense: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  })
  
  Driver.associate = (models) => {
    models.driver.belongsTo(models.company, {
      foreignKey: {
        allowNull: false,
      }
    })

    models.driver.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      }
    })
  }

  return Driver
}

module.exports = Driver
