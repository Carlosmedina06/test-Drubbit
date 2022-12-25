const { Router } = require('express')
const { getProduct } = require('../controllers/product.controller')

const router = Router()

router.get('/', getProduct)

module.exports = router
