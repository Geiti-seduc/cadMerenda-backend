/**
 * @swagger
 * components:
 *   schemas:
 *     RequestedProducts:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID of the requested product.
 *         quantity:
 *           type: integer
 *           description: Quantity of the requested product.
 *         frequency:
 *           type: string
 *           description: Frequency of the requested product.
 *         order_id:
 *           type: string
 *           description: ID of the order associated with the requested product.
 *         food_id:
 *           type: string
 *           description: ID of the food associated with the requested product.
 *         createdAt:
 *           type: string
 *           format: data-type
 *           description: Record creation date and time.
 *         updatedAt:
 *           type: string
 *           format: data-type
 *           description: Date and time of last record update.
 *       example:
 *         id: "1"
 *         quantity: 10
 *         frequency: "daily"
 *         order_id: "123"
 *         food_id: "456"
 */

/**
 * @swagger
 * /requested:
 *   get:
 *     summary: Get all requested products.
 *     tags:
 *       - Requested Products
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RequestedProducts'
 *                 createdAt:
 *                   type: string
 *                 updateAt:
 *                   type: string
 *               example:
 *               - id: "2000"
 *                 quantity: "20"
 *                 frequency: "Semanal"
 *                 order_id: "204"
 *                 food_id: "230"
 *                 createdAt: "2024-01-05T15:48:23.183Z"
 *                 updateAt: "2024-01-06T15:48:23.183Z"
 * 
 *               - id: "2010"
 *                 quantity: "10"
 *                 frequency: "Semanal"
 *                 order_id: "205"
 *                 food_id: "256"
 *                 createdAt: "2024-01-05T15:48:23.183Z"
 *                 updateAt: "2024-01-06T15:48:23.183Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /requested/{id}:
 *   get:
 *     summary: Get a requested product by ID.
 *     tags:
 *       - Requested Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the requested product to retrieve.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RequestedProducts'
 *               
 *               example:
 *                 id: "2000"
 *                 quantity: "20"
 *                 frequency: "Semanal"
 *                 order_id: "204"
 *                 food_id: "230"
 *                 createdAt: "2024-01-05T15:48:23.183Z"
 *                 updateAt: "2024-01-06T15:48:23.183Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /requested:
 *   post:
 *     summary: Create a new requested product.
 *     tags:
 *       - Requested Products
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/RequestedProducts'
 *             example:
 *               quantity: 5
 *               frequency: "weekly"
 *               order_id: "601"
 *               food_id: "304"
 *     responses:
 *       '201':
 *         description: Requested product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *                 frequency:
 *                   type: string
 *                 order_id:
 *                   type: string
 *                 food_id:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updateAt:
 *                   type: string
 *               
 *               example:
 *                 id: "2000"
 *                 quantity: "20"
 *                 frequency: "Semanal"
 *                 order_id: "204"
 *                 food_id: "230"
 *                 createdAt: "2024-01-05T15:48:23.183Z"
 *                 updateAt: "2024-01-06T15:48:23.183Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /requested/{id}:
 *   put:
 *     summary: Update an existing requested product.
 *     tags:
 *       - Requested Products
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the requested product to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/RequestedProducts'
 *             example:
 *               quantity: 8
 *               frequency: "daily"
 *               order_id: "601"
 *               food_id: "301"
 *     responses:
 *       '200':
 *         description: Requested product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *                 frequency:
 *                   type: string
 *                 order_id:
 *                   type: string
 *                 food_id:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updateAt:
 *                   type: string
 *               
 *               example:
 *                 id: "2000000"
 *                 quantity: 8
 *                 frequency: "daily"
 *                 order_id: "601"
 *                 food_id: "301"
 *                 createdAt: "2024-01-05T15:48:23.183Z"
 *                 updateAt: "2024-01-06T15:48:23.183Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /requested/{id}:
 *   delete:
 *     summary: Delete a requested product
 *     tags:
 *       - Requested Products
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the requested product to be deleted.
 *     responses:
 *       '204':
 *         description: Product deleted successfully.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */
