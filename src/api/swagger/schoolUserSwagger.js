/**
 * @swagger
 * components:
 *   schemas:
 *     SchoolUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: User School Id.
 *         role:
 *           type: string
 *           description: Role of the user in the school.
 *         school_inep:
 *           type: string
 *           description: School INEP code.
 *         user_id:
 *           type: string
 *           description: User id.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Cycle creation date and time.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time of last cycle update.
 */

/**
 * @swagger
 * /school_user:
 *   get:
 *     summary: Get all School Users.
 *     tags: [School User]
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
 *                 ref: '#/components/schemas/SchoolUser'
 *               example:
 *                 - id: "6001"
 *                   role: "Gestor"
 *                   school_inep: "27036782"
 *                   user_id: "10344544741"
 *                   createdAt: "2024-01-10T16:13:32.332Z"
 *                   updatedAt: "2024-01-10T16:13:32.332Z"
 *                 - id: "6002"
 *                   role: "Gestor"
 *                   school_inep: "27036960"
 *                   user_id: "12489657403"
 *                   createdAt: "2024-01-10T16:13:32.332Z"
 *                   updatedAt: "2024-01-10T16:13:32.332Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /school_user/{id}:
 *   get:
 *     summary: Get a School User by ID.
 *     tags: [School User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the School User to be obtained.
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
 *                 ref: '#/components/schemas/SchoolUser'
 *               example:
 *                 id: "6001"
 *                 role: "Gestor"
 *                 school_inep: "27036782"
 *                 user_id: "10344544741"
 *                 createdAt: "2024-01-10T16:13:32.332Z"
 *                 updatedAt: "2024-01-10T16:13:32.332Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /school_user:
 *   post:
 *     summary: Create a new School User.
 *     tags: [School User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               ref: '#/components/schemas/SchoolUser'
 *             example:
 *               role: "Gestor"
 *               school_inep: "27036731"
 *               user_id: "10344544741"
 *     responses:
 *       '201':
 *         description: School User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolUser'
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /school_user/{id}:
 *   put:
 *     summary: Update a School User by ID.
 *     tags: [School User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the School User to be updated.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               ref: '#/components/schemas/SchoolUser'
 *             example:
 *               role: "Gestor"
 *               school_inep: "27036731"
 *               user_id: "10344544741"
 *     responses:
 *       '200':
 *         description: School User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolUser'
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: School User not found.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /school_user/{id}:
 *   delete:
 *     summary: Delete a School User by ID.
 *     tags: [School User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the School User to be deleted.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '204':
 *         description: School User deleted successfully.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */
