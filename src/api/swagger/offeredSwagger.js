/**
 * @swagger
 * components:
 *   schemas:
 *     OfferedProducts:
 *       type: object
 *       properties:
 *         id:
 *           type:
 *           description: Offered Id.
 *         quantity:
 *           type: integer
 *           description: The quantity of the offered product.
 *         frequency:
 *           type: string
 *           description: The frequency at which the product is offered (e.g., daily, weekly).
 *         product_price:
 *           type: number
 *           description: The price of the offered product.
 *         offer_id:
 *           type: string
 *           description: The ID of the offer associated with the product.
 *         food_id:
 *           type: string
 *           description: The ID of the food product.
 *         brand:
 *           type: string
 *           description: The brand of the offered product.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data e hora de criação do registro
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data e hora da última atualização do registro
 */

/**
 * @swagger
 * /offered:
 *   get:
 *     summary: Get all offered products
 *     tags:
 *       - Offered Products
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OfferedProducts'
 *               example:
 *                 - id: "452126"
 *                   quantity: 100
 *                   frequency: "Mensal"
 *                   product_price: 11.5
 *                   offer_id: "1001"
 *                   food_id: "301"
 *                   createdAt: "2024-01-10T13:25:42.188Z"
 *                   updatedAt: "2024-01-10T13:25:42.188Z"
 *                   brand: "fila"
 *                 - id: "452127"
 *                   quantity: 10
 *                   frequency: "quinzeal"
 *                   product_price: 2.5
 *                   offer_id: "1001"
 *                   food_id: "302"
 *                   createdAt: "2024-01-10T13:25:42.188Z"
 *                   updatedAt: "2024-01-10T13:25:42.188Z"
 *                   brand: "Under Armour"
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /offered/{id}:
 *   get:
 *     summary: Get an offered product by ID
 *     tags:
 *       - Offered Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the offered product to retrieve
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OfferedProducts'
 *               example:
 *                 id: "452126"
 *                 quantity: 100
 *                 frequency: "Mensal"
 *                 product_price: 11.5
 *                 offer_id: "1001"
 *                 food_id: "301"
 *                 createdAt: "2024-01-10T13:25:42.188Z"
 *                 updatedAt: "2024-01-10T13:25:42.188Z"
 *                 brand: "fila"
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /offered:
 *   post:
 *     summary: Create a new offered product
 *     tags:
 *       - Offered Products
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/OfferedProducts'
 *             example:
 *               quantity: 100
 *               frequency: "Mensal"
 *               product_price: 11.5
 *               offer_id: "1001"
 *               food_id: "301"
 *               brand: "fila"
 *     responses:
 *       '201':
 *         description: Offered product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OfferedProducts'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /offered/{id}:
 *   put:
 *     summary: Update an existing offered product
 *     tags:
 *       - Offered Products
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the offered product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/OfferedProducts'
 *             example:
 *               quantity: 100
 *               frequency: "Mensal"
 *               product_price: 11.5
 *               offer_id: "1001"
 *               food_id: "301"
 *               brand: "fila"
 *     responses:
 *       '200':
 *         description: Offered product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OfferedProducts'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /offered/{id}:
 *   delete:
 *     summary: Delete an offered product (No one is allowed to delete address).
 *     tags:
 *       - Offered Products
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the offered product to delete
 *     responses:
 *       '204':
 *         description: Offered product deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
