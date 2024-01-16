/**
 * @swagger
 * components:
 *   schemas:
 *     Food:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Certificate ID.
 *         name:
 *           type: string
 *           description: Name of the food.
 *         description:
 *           type: string
 *           description: Description of the food.
 *         measure:
 *           type: string
 *           description: Unit of food measurement.
 *         category:
 *           type: string
 *           description: Food category.
 *         nmc:
 *           type: integer
 *           minimum: 00000000
 *           maximum: 99999999
 *           description: Mercosur Common Nomenclature (Nomeclatura Comum do Mercosul).
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Cycle creation date and time.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time of last cycle update.
 *       required:
 *         - name
 *         - measure
 *         - category
 */

/**
 * @swagger
 * /food:
 *   get:
 *     summary: Get all food items.
 *     tags:
 *       - Food
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
 *                 #$ref: '#components/schemas/Food'
 *               example:
 *                 - id: "301"
 *                   name: "Açúcar"
 *                   description: "Refinado"
 *                   measure: "KG"
 *                   category: "Açúcar e doces"
 *                   nmc: 12345678
 *                   createdAt: "2024-01-09T19:08:47.969Z"
 *                   updatedAt: "2024-01-09T19:08:47.969Z"
 *                 - id: "302"
 *                   name: "Sal"
 *                   description: "Refinado"
 *                   measure: "KG"
 *                   category: "Sal e condimentos"
 *                   nmc: 12345679
 *                   createdAt: "2024-01-09T19:08:47.969Z"
 *                   updatedAt: "2024-01-09T19:08:47.969Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /food/{id}:
 *   get:
 *     summary: Get a food item by ID.
 *     tags:
 *       - Food
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the food item to be retrieved.
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
 *                 #$ref: '#components/schemas/Food'
 *               example:
 *                 id: "301"
 *                 name: "Açúcar"
 *                 description: "Refinado"
 *                 measure: "KG"
 *                 category: "Açúcar e doces"
 *                 nmc: 12345678
 *                 createdAt: "2024-01-09T19:08:47.969Z"
 *                 updatedAt: "2024-01-09T19:08:47.969Z"
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Food not found.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /food:
 *   post:
 *     summary: Create a new food item.
 *     tags:
 *       - Food
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               #$ref: '#components/schemas/Food'
 *             example:
 *               name: "Melancia"
 *               description: "Fruta"
 *               measure: "KG"
 *               category: "Frutas e raizes"
 *               nmc: 13650071
 *     responses:
 *       '201':
 *         description: Food created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /food/{id}:
 *   put:
 *     summary: Update a food item by ID.
 *     tags:
 *       - Food
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do alimento a ser atualizado.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               #$ref: '#components/schemas/Food'
 *             example:
 *               name: "Melancia"
 *               description: "Fruta"
 *               measure: "KG"
 *               category: "Frutas e raizes"
 *               nmc: 13650071
 *     responses:
 *       '200':
 *         description: Food updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Food not found.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /food/{id}:
 *   delete:
 *     summary: Delete a food item by ID.
 *     tags:
 *       - Food
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do alimento a ser excluído.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '204':
 *         description: Food deleted successfully.
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Food not found.
 *       '500':
 *         description: Internal Server Error.
 */
