const { compare } = require('bcrypt')
const jwt = require('jsonwebtoken')
const database = require('../../database')
const UserModel = database.model('user')

const secret = process.env.SECRET

const authentication = async (req, res, next) => {
 console.log('primeiro 1')
 try {
  console.log('primeiro 2')
  const user = await UserModel.findOne({ where: { document: req.body.document } })
  console.log('primeiro 3')
  const checkedPassword = await compare(req.body.password, user.password)
  console.log('primeiro 4')
  if(!checkedPassword) {  
    console.log('primeiro 5')
    throw new Error('Username or password do not match')
  }
  console.log('primeiro 6')
  const token = jwt.sign({ user }, secret, { expiresIn: '24h'})
  console.log('primeiro 7')
  res.json({ user, token })
  console.log('primeiro 8')
 } catch (error) {
  console.log('primeiro 9', error)
   res.status(400).json({ errors: [{ error: error.name, message: error.message }]})
 }

}

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']

  if(token) {
    jwt.verify(token.slice(7, token.length), secret, (err, decoded) => {
      if(err) {
        return res.status(403).json({
          success: false,
          message: 'Token is not valid'
        })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).json({
      success: false,
      message: 'Auth token is not supplied'
    })
  }
}

module.exports = {
  authentication,
  checkToken,
}
