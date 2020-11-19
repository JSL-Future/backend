const mongoose = require('mongoose')
const { MONGO_DB_HOST } = process.env

mongoose.connect(MONGO_DB_HOST, { useNewUrlParser: true })

let _db = mongoose.connection
_db.on('error', console.error.bind(console, 'connection error:'))
_db.once('open', () => {
    console.log('The database application is running')
})

module.exports = _db