const express = require('express');
const NewUserController = require('../controllers/usersController.js');
const router = express.Router(); // Create a new router instance

router.post('/register', NewUserController.register);
router.post('/login', NewUserController.login);
router.get('/logout', NewUserController.logout);
module.exports = router;
