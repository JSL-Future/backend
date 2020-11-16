
const router = require('express').Router()
const { fleetController } = require('../../controllers')

router.get('/fleets', fleetController.getAll)
router.post('/fleets', fleetController.create)
router.put('/fleets/:id', fleetController.update)
router.get('/fleets/:id', fleetController.getById)

module.exports = router
