const Sequelize = require('sequelize')

const Company = (sequelize) => {
  const Company = sequelize.define('company', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    document: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    type: {
        type: Sequelize.ENUM(['filial', 'matriz']),
        allowNull: false,
        defaultValue: 'filial'
    }
  })

  return Company
}

module.exports = Company
