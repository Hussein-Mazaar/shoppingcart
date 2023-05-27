const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

/**
 * @swagger
 * /api/cart/cartInfo:
 *   get:
 *     summary: Get cart information
 *     description: Retrieve information about the user's cart
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for authentication
 *     responses:
 *       '200':
 *         description: Cart information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     totalPrice:
 *                       type: number
 *                     status:
 *                       type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       cartId:
 *                         type: integer
 *                       prodId:
 *                         type: integer
 *                       quantity:
 *                         type: integer
 *                       price:
 *                         type: number
 *                       name:
 *                         type: string
 *                       totalPrice:
 *                         type: number
 *             example:
 *               cart:
 *                 id: 1
 *                 userId: 1
 *                 totalPrice: 1000
 *                 status: "open"
 *               items:
 *                 - id: 1
 *                   cartId: 1
 *                   prodId: 1
 *                   quantity: 1
 *                   price: 1000
 *                   name: "iPhone 11"
 *                   totalPrice: 1000
 */

router.get('/cartInfo', cartController.cartInfo);

/**
 * @swagger
 * /api/cart/addItem:
 *   post:
 *     summary: Add item to cart
 *     description: Add a new item to the user's cart
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prodId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Updated cart information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     totalPrice:
 *                       type: number
 *                     status:
 *                       type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       cartId:
 *                         type: integer
 *                       prodId:
 *                         type: integer
 *                       quantity:
 *                         type: integer
 *                       price:
 *                         type: number
 *                       name:
 *                         type: string
 *                       totalPrice:
 *                         type: number
 *             example:
 *               cart:
 *                 id: 1
 *                 userId: 1
 *                 totalPrice: 1000
 *                 status: "open"
 *               items:
 *                 - id: 1
 *                   cartId: 1
 *                   prodId: 1
 *                   quantity: 1
 *                   price: 1000
 *                   name: "iPhone 11"
 *                   totalPrice: 1000
 */

router.post('/addItem', cartController.addItem)

/**
 * @swagger
 * /api/cart/setQuantity:
 *   put:
 *     summary: Update item quantity in cart
 *     description: Update the quantity of an item in the user's cart
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Updated cart information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     totalPrice:
 *                       type: number
 *                     status:
 *                       type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       cartId:
 *                         type: integer
 *                       prodId:
 *                         type: integer
 *                       quantity:
 *                         type: integer
 *                       price:
 *                         type: number
 *                       name:
 *                         type: string
 *                       totalPrice:
 *                         type: number
 *             example:
 *               cart:
 *                 id: 1
 *                 userId: 1
 *                 totalPrice: 10000
 *                 status: "open"
 *               items:
 *                 - id: 1
 *                   cartId: 1
 *                   prodId: 1
 *                   quantity: 10
 *                   price: 1000
 *                   name: "iPhone 11"
 *                   totalPrice: 10000
 */

router.put('/setQuantity', cartController.setItemQuantity)

/**
 * @swagger
 * /api/cart/placeOrder:
 *   post:
 *     summary: Place an order
 *     description: Place an order for the items in the user's cart
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for authentication
 *     responses:
 *       '200':
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 totalPrice:
 *                   type: number
 *                 status:
 *                   type: string
 *             example:
 *               id: 1
 *               userId: 1
 *               totalPrice: 10000
 *               status: "closed"
 */

router.post('/placeOrder', cartController.placeOrder)


module.exports = router;
