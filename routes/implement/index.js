
const router = require('express').Router()
const { implementController } = require('../../controllers')

router.post('/implements', implementController.create)
router.put('/implements/:id', implementController.update)
router.get('/implements/:id', implementController.getById)

module.exports = router
