const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jsl-sandbox', { useNewUrlParser: true })

let _db = mongoose.connection
_db.on('error', console.error.bind(console, 'connection error:'))
_db.once('open', () => {
    console.log('The database of login microservice application is running')
})

module.exports = _db