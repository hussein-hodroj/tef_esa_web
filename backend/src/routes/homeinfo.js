
const express = require('express');
const router = express.Router();
const homeinfoController = require('../controllers/homeinfo');


router.get('/homeinfo', homeinfoController.getHomeinfoData);

module.exports = router;
