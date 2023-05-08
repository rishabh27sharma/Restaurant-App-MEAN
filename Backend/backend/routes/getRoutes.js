const express = require('express')
const router = express.Router()
const { getRestaurents, setRestaurent, updateRestaurent, deleteRestaurent } = require('../controllers/goalController')

router.route('/').get(getRestaurents).post(setRestaurent)
router.route('/:id').put(updateRestaurent).delete(deleteRestaurent)

module.exports = router;