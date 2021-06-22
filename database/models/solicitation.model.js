const Sequelize = require('sequelize')

const Solicitation = (sequelize) => {
  const Solicitation = sequelize.define('solicitation', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    filial: {
        type: Sequelize.STRING,
        allowNull: false
    },
    plateHorse: {
        type: Sequelize.STRING,
        allowNull: false
    },
    plate: {
        type: Sequelize.STRING,
        allowNull: false
    },
    centralCost: {
        type: Sequelize.STRING,
        allowNull: false
    },
    driver: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phoneDrive: {
        type: Sequelize.STRING,
        allowNull: false
    },
    documentDrive: {
        type: Sequelize.STRING,
        allowNull: false
    },
    priority: {
        type: Sequelize.ENUM(['low', 'medium', 'high']),
        allowNull: false,
        defaultValue: 'medium',
    },
    status: {
        type: Sequelize.ENUM([
            'solicitation', 
            'check-in', 
            'check-out', 
            'courtyard',
            'washing',
            'awaiting_repair',
            'dock',
            'suply',
        ]),
        allowNull: false,
        defaultValue: 'solicitation',
      },
    service: {
        type: Sequelize.ENUM([
            'abastecer', 
            'preventiva', 
            'corretiva', 
            'estacionar', 
            'lavar'
        ]),
        allowNull: false,
        defaultValue: 'preventiva'
    },
    serviceDescription: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    operation: {
        type: Sequelize.STRING,
        allowNull: true
    },
  })

  return Solicitation
}

module.exports = Solicitation
