const Express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = Express()

const AuthenticationRoutes = require('./routes/authentication')
const implementRoutes = require('./routes/implement')
const userRoutes = require('./routes/user')
const { AuthenticationController } = require('./controllers')

const baseUrl = '/api'

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/auth', AuthenticationRoutes)
app.use(baseUrl, AuthenticationController.checkToken)
app.use(baseUrl, implementRoutes)
app.use(baseUrl, userRoutes)

app.listen(3003, () => console.log('running...'))
module.exports = app
