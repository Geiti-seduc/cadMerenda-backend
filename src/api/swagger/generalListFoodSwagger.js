/**
 * @swagger
 * components:
 *   schemas:
 *     GeneralListFood:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: General List Food Id.
 *         food_id:
 *           type: string
 *           description: ID of the associated food.
 *         general_list_id:
 *           type: string
 *           description: ID of the associated general list.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp.
 *       required:
 *         - food_id
 *         - general_list_id
 */

/**
 * @swagger
 * /general_list_food:
 *   get:
 *     summary: Get all General Lists Foods.
 *     tags:
 *       - General List Food
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
 *                 $ref: '#/components/schemas/GeneralListFood'
 *               example:
 *                 - id: "801"
 *                   food_id: "301"
 *                   general_list_id: "701"
 *                   createdAt: "2024-01-10T11:54:50.479Z"
 *                   updatedAt: "2024-01-10T11:54:50.479Z"
 *                   food:
 *                     id: "301"
 *                     name: "Açúcar"
 *                     description: "refinado"
 *                     measure: "KG"
 *                     category: "Açúcar e doces"
 *                     nmc: 12345678
 *                     createdAt: "2024-01-10T11:54:50.275Z"
 *                     updatedAt: "2024-01-10T11:54:50.275Z"
 *                 - id: "802"
 *                   food_id: "302"
 *                   general_list_id: "702"
 *                   createdAt: "2024-01-10T11:54:50.480Z"
 *                   updatedAt: "2024-01-10T11:54:50.480Z"
 *                   food:
 *                     id: "302"
 *                     name: "Sal"
 *                     description: "refinado"
 *                     measure: "KG"
 *                     category: "Sal e condimentos"
 *                     nmc: 12345679
 *                     createdAt: "2024-01-10T11:54:50.275Z"
 *                     updatedAt: "2024-01-10T11:54:50.275Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /general_list_food/{id}:
 *   get:
 *     summary: Get a General List Food by ID.
 *     tags:
 *       - General List Food
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the General List Food to be obtained.
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
 *                 $ref: '#/components/schemas/GeneralListFood'
 *               example:
 *                 id: "801"
 *                 food_id: "301"
 *                 general_list_id: "701"
 *                 createdAt: "2024-01-10T11:54:50.479Z"
 *                 updatedAt: "2024-01-10T11:54:50.479Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /general_list_food/post:
 *   post:
 *     summary: Create a new General List Food.
 *     tags:
 *       - General List Food
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/GeneralListFood'
 *             example:
 *               food_id: "304"
 *               general_list_id: "705"
 *     responses:
 *       '201':
 *         description: General List Food created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralListFood'
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /general_list_food/{id}:
 *   put:
 *     summary: Update a General List Food by ID.
 *     tags:
 *       - General List Food
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the General List Food to be updated.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/GeneralListFood'
 *             example:
 *               food_id: "304"
 *               general_list_id: "705"
 *     responses:
 *       '200':
 *         description: General List Food updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralListFood'
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: General List Food not found.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /general_list_food/{id}:
 *   delete:
 *     summary: Delete a General List Food by ID.
 *     tags:
 *       - General List Food
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the General List Food to be deleted.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '204':
 *         description: General List Food deleted successfully.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */
