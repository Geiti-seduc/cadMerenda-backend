/**
 * @swagger
 * components:
 *   schemas:
 *     Modality:
 *       type: object
 *       properties:
 *         id:
 *           type:
 *           description: Modality Id.
 *         name:
 *           type: string
 *           description: Modality name.
 *         description:
 *           type: string
 *           description: Description of the modality (optional).
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data e hora de criação do registro
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data e hora da última atualização do registro
 *       required:
 *         - name
 *         - description
 */

/**
 * @swagger
 * /modality:
 *   get:
 *     summary: Get all modalities.
 *     tags:
 *       - Modality
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
 *                 '#/components/schemas/Modality'
 *               example:
 *                 - id: "901"
 *                   name: "Educação Básica - Tempo Parcial"
 *                   description: "O ensino regular é a educação padrão, com currículo fixo, avaliações regulares e presença na sala de aula."
 *                   createdAt: "2024-01-10T13:25:41.934Z"
 *                   updatedAt: "2024-01-10T13:25:41.934Z"
 *                 - id: "901"
 *                   name: "Centro de AEE"
 *                   description: "O ensino integral envolve dias escolares mais longos, com atividades acadêmicas e extracurriculares integradas."
 *                   createdAt: "2024-01-10T13:25:41.934Z"
 *                   updatedAt: "2024-01-10T13:25:41.934Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /modality/{id}:
 *   get:
 *     summary: Get a modality by ID.
 *     tags:
 *       - Modality
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the modality to retrieve
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
 *                 '#/components/schemas/Modality'
 *               example:
 *                 id: "901"
 *                 name: "Educação Básica - Tempo Parcial"
 *                 description: "O ensino regular é a educação padrão, com currículo fixo, avaliações regulares e presença na sala de aula."
 *                 createdAt: "2024-01-10T13:25:41.934Z"
 *                 updatedAt: "2024-01-10T13:25:41.934Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /modality:
 *   post:
 *     summary: Create a new modality.
 *     tags:
 *       - Modality
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             items:
 *               '#/components/schemas/Modality'
 *         example:
 *           name: "Nome da nova modalidade"
 *           description: "Descrição da nova modalidade."
 *     responses:
 *       '201':
 *         description: Modality created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Modality'
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /modality/{id}:
 *   put:
 *     summary: Update an existing modality.
 *     tags:
 *       - Modality
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the modality to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             items:
 *               '#/components/schemas/Modality'
 *           example:
 *             name: "Nome da nova modalidade atualizada"
 *             description: "Descrição da nova modalidade atualizada."
 *     responses:
 *       '200':
 *         description: Modality updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Modality'
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /modality/{id}:
 *   delete:
 *     summary: Delete a modality.
 *     tags:
 *       - Modality
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the modality to delete.
 *     responses:
 *       '204':
 *         description: Modality deleted successfully.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */
