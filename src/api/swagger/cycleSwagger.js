/**
 * @swagger
 * components:
 *   schemas:
 *     Cycle:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Cycle ID.
 *         startNutri:
 *           type: string
 *           format: date-time
 *           description: Start date for nutrition to set the agenda.
 *         deadlineNutri:
 *           type: string
 *           format: date-time
 *           description: Final date for nutrition to set the agenda.
 *         startSchool:
 *           type: string
 *           format: date-time
 *           description: Start date for school to school submit your request.
 *         deadlineSchool:
 *           type: string
 *           format: date-time
 *           description: Final date for school to school to submit your application.
 *         startSupplier:
 *           type: string
 *           format: date-time
 *           description: Initial deadline for suppliers to submit their proposals.
 *         deadlineSupplier:
 *           type: string
 *           format: date-time
 *           description: Deadline for suppliers to submit their proposals.
 *         initSelectSupplier:
 *           type: string
 *           format: date-time
 *           description: Initial deadline for schools to choose the best proposal.
 *         deadlineSelectSupplier:
 *           type: string
 *           format: date-time
 *           description: Deadline for schools to choose the best proposal.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Cycle record creation date and time.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time of last cycle update.
 */

/**
 * @swagger
 * /cycle:
 *   get:
 *     summary: Get all cycles.
 *     tags:
 *       - Cycle
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
 *                 $ref: '#/components/schemas/Cycle'
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /cycle/{cycleId}:
 *   get:
 *     summary: Get a cycle by ID.
 *     tags:
 *       - Cycle
 *     parameters:
 *       - in: path
 *         name: cycleId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cycle ID to be retrieved.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cycle'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Cycle not found.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /cycle/last/desc:
 *   get:
 *     summary: Get the last cycle in descending order.
 *     tags:
 *       - Cycle
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cycle'
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: No cycles found.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /cycle/last/pending:
 *   get:
 *     summary: Get the last pending cycle.
 *     tags:
 *       - Cycle
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cycle'
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: No pending cycles found.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /cycle/create:
 *   post:
 *     summary: Create a new cycle.
 *     tags:
 *       - Cycle
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/Cycle'
 *             example:
 *               startNutri: "2024-01-08T12:00:00Z"
 *               deadlineNutri: "2024-01-15T12:00:00Z"
 *               startSchool: "2024-01-20T12:00:00Z"
 *               deadlineSchool: "2024-02-01T12:00:00Z"
 *               startSupplier: "2024-02-10T12:00:00Z"
 *               deadlineSupplier: "2024-02-20T12:00:00Z"
 *               initSelectSupplier: "2024-02-25T12:00:00Z"
 *               deadlineSelectSupplier: "2024-03-05T12:00:00Z"
 *     responses:
 *       '201':
 *         description: Cycle created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cycle'
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /cycle/{cycleId}:
 *   put:
 *     summary: Update a cycle by ID.
 *     tags:
 *       - Cycle
 *     parameters:
 *       - in: path
 *         name: cycleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cycle to update.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/Cycle'
 *             example:
 *               startNutri: "2024-01-08T12:00:00Z"
 *               deadlineNutri: "2024-01-15T12:00:00Z"
 *               startSchool: "2024-01-20T12:00:00Z"
 *               deadlineSchool: "2024-02-01T12:00:00Z"
 *               startSupplier: "2024-02-10T12:00:00Z"
 *               deadlineSupplier: "2024-02-20T12:00:00Z"
 *               initSelectSupplier: "2024-02-25T12:00:00Z"
 *               deadlineSelectSupplier: "2024-03-05T12:00:00Z"
 *     responses:
 *       '200':
 *         description: Cycle updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cycle'
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Cycle not found.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /cycle/{cycleId}:
 *   delete:
 *     summary: Delete a cycle by ID.
 *     tags:
 *       - Cycle
 *     parameters:
 *       - in: path
 *         name: cycleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cycle to delete.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '204':
 *         description: Cycle deleted successfully.
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Cycle not found.
 *       '500':
 *         description: Internal Server Error.
 */
