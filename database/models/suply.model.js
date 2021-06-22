const Sequelize = require('sequelize')

const Suply = (sequelize) => {
  const Suply = sequelize.define('suply', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    fleet: {
        type: Sequelize.STRING,
        allowNull: false
    },
    plate: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mileage: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fuel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    totalLiters: {
        type: Sequelize.STRING,
        allowNull: false
    },
    registerDriver: {
        type: Sequelize.STRING,
        allowNull: false
    },
    driver: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pedometer: {
        type: Sequelize.STRING,
        allowNull: false
    },
    operation: {
        type: Sequelize.STRING,
        allowNull: false
    },
  })

  return Suply
}

module.exports = Suply
