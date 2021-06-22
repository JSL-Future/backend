const router = require('express').Router()
const { solicitationController } = require('../../controllers')

router.get('/solicitations', solicitationController.getAll)
router.get('/solicitations/:id', solicitationController.getById)
router.put('/solicitations/:id', solicitationController.update)
router.post('/solicitations', solicitationController.createSolicitation)

module.exports = router