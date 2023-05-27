const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     description: Login with username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */

router.post('/login', userController.login);
// router.get('/userInfo', userController.userInfo);

module.exports = router;
