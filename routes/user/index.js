const router = require('express').Router()
const { userController } = require('../../controllers')

router.get('/users', userController.getAll)
router.post('/users', userController.create)
router.put('/users/:id', userController.update)
router.get('/users/:id', userController.getById)

module.exports = router
