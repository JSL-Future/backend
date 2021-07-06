const router = require('express').Router()
const { maintenanceOrderController } = require('../../controllers')

router.post('/maintenance-orders', maintenanceOrderController.create)
router.get('/maintenance-orders', maintenanceOrderController.getAll)
router.put('/maintenance-orders/:id', maintenanceOrderController.update)
router.get('/maintenance-orders/:id', maintenanceOrderController.getById)

module.exports = router
