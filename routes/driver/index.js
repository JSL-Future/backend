const router = require('express').Router()
const { driverController } = require('../../controllers')

router.post('/drivers', driverController.create)
router.get('/drivers', driverController.getAll)
router.put('/drivers/:id', driverController.update)
router.get('/drivers/:id', driverController.getById)

module.exports = router
