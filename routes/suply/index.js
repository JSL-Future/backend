const router = require('express').Router()
const { suplyController } = require('../../controllers')

router.get('/suplies', suplyController.getAll)
router.get('/suplies/:id', suplyController.getById)
router.put('/suplies/:id', suplyController.update)
router.post('/suplies', suplyController.createSuply)

module.exports = router