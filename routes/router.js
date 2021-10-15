const { Router } = require('express')
const Controllers = require('../controllers/index')

const router = Router()

router.post('/get_address', Controllers.get)

router.post('/get_one_address', Controllers.getOne)

router.post('/get_street_address', Controllers.getStreet)

router.post('/add', Controllers.add)

router.post('/part_word', Controllers.getPartWord)

router.post('/delete', Controllers.delete)

router.post('/update', Controllers.update)

module.exports = router
