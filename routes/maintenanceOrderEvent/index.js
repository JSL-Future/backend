const router = require('express').Router()
const { maintenanceOrderController } = require('../../controllers')

router.put('/maintenance-order-events/:id', maintenanceOrderController.update)

module.exports = router
