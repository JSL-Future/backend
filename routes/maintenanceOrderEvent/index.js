const router = require('express').Router()
const { maintenanceOrderController } = require('../../controllers')

router.put('/maintenance-order-events/:id', maintenanceOrderController.createEventToMaintenanceOrder)

module.exports = router
