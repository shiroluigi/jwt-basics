const express = require('express')
const router = express.Router()

const {handleDashboard,handleLogin} = require('../controllers/controllerFunctions')

router.route('/dashboard').get(handleDashboard)
router.route('/login').post(handleLogin)


module.exports = router