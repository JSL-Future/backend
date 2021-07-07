const router = require('express').Router()
const { operationController } = require('../../controllers')

router.post('/operations', operationController.create)
router.get('/operations', operationController.getAll)
router.put('/operations/:id', operationController.update)
router.get('/operations/:id', operationController.getById)

module.exports = router
