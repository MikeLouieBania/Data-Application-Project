const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/home', homeController.getHome);
router.post('/home', homeController.registerHome);

module.exports = router;
