/**
 * @swagger
 * components:
 *   schemas:
 *     Gee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Gee ID.
 *         name:
 *           type: string
 *           description: GEE name.
 *         address_id:
 *           type: string
 *           description: ID of the address associated with the GEE.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp.
 *       required:
 *         - name
 *         - address_id
 */

/**
 * @swagger
 * /gee:
 *   get:
 *     summary: Get all GEEs.
 *     tags:
 *       - Gee
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
 *                 $ref: '#/components/schemas/Gee'
 *               example:
 *                - id: "401"
 *                  name: "1° Gee"
 *                  address_id: "10"
 *                  createdAt: "2024-01-09T19:08:47.933Z"
 *                  updatedAt: "2024-01-09T19:08:47.933Z"
 *                - id: "402"
 *                  name: "2° Gee"
 *                  address_id: "11"
 *                  createdAt: "2024-01-09T19:08:47.933Z"
 *                  updatedAt: "2024-01-09T19:08:47.933Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /gee/{id}:
 *   get:
 *     summary: Get a GEE by ID.
 *     tags:
 *       - Gee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the GEE to retrieve.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Gee'
 *               example:
 *                 id: "401"
 *                 name: "1° Gee"
 *                 address_id: "10"
 *                 createdAt: "2024-01-09T19:08:47.933Z"
 *                 updatedAt: "2024-01-09T19:08:47.933Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /gee/post:
 *   post:
 *     summary: Create a new GEE.
 *     tags:
 *       - Gee
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/Gee'
 *             example:
 *               name: "14° Gee"
 *               address_id: "10"
 *     responses:
 *       '201':
 *         description: GEE created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gee'
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /gee/{id}:
 *   put:
 *     summary: Update a GEE by ID.
 *     tags:
 *       - Gee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: GEE ID to be updated.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/Gee'
 *             example:
 *               name: "14° Gee"
 *               address_id: "10"
 *     responses:
 *       '200':
 *         description: GEE successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gee'
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: GEE not found.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /gee/{id}:
 *   delete:
 *     summary: Delete a GEE by ID.
 *     tags:
 *       - Gee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: GEE ID to be deleted.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '204':
 *         description: GEE successfully deleted.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */
