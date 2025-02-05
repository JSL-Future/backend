const Express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = Express()

const AuthenticationRoutes = require('./routes/authentication')
const { AuthenticationController } = require('./controllers')
const { getByIdMobile } = require('./controllers/maintenanceOrder')

const companyRoutes = require('./routes/company')
const userRoutes = require('./routes/user')
const operationRoutes = require('./routes/operation')
const vehicleTypeRoutes = require('./routes/vehicleType')
const vehicleRoutes = require('./routes/vehicle')
const driverRoutes = require('./routes/driver')
const maintenanceOrderRoutes = require('./routes/maintenanceOrder')
const maintenanceOrderEventRoutes = require('./routes/maintenanceOrderEvent')

const baseUrl = '/api'

app.use(cors())

app.use(morgan('dev'))
app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/qrcode-detail/:id', getByIdMobile)
app.use('/auth', AuthenticationRoutes)
app.use(baseUrl, AuthenticationController.checkToken)
app.use(baseUrl, companyRoutes)
app.use(baseUrl, userRoutes)
app.use(baseUrl, operationRoutes)
app.use(baseUrl, vehicleTypeRoutes)
app.use(baseUrl, vehicleRoutes)
app.use(baseUrl, driverRoutes)
app.use(baseUrl, maintenanceOrderRoutes)
app.use(baseUrl, maintenanceOrderEventRoutes)

module.exports = app
