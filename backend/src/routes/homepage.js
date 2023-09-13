
const express = require('express');
const router = express.Router();
const homepageController = require('../controllers/homepage');


router.get('/homepage', homepageController.getHomepageData);

module.exports = router;
