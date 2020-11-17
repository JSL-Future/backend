
const router = require('express').Router()
const { implementController } = require('../../controllers')

router.get('/implements', implementController.getAll)
router.post('/implements', implementController.create)
router.put('/implements/:id', implementController.update)
router.get('/implements/:id', implementController.getById)

module.exports = router
