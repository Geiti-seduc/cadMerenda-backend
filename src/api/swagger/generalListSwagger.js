/**
 * @swagger
 * components:
 *   schemas:
 *     GeneralList:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: General List id.
 *         cycle_id:
 *           type: string
 *           description: General List ciclo id.
 *         description:
 *           type: string
 *           description: Descrição da lista geral.
 *         modality_id:
 *           type: string
 *           description: Id da modalidade.
 *         createdAt:
 *           type: string
 *           description: Creation timestamp.
 *         updatedAt:
 *           type: string
 *           description: Last update timestamp.
 */

/**
 * @swagger
 * /general_list:
 *   get:
 *     summary: Get all General Lists.
 *     tags:
 *       - General Lists
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
 *                 $ref: '#/components/schemas/GeneralList'
 *               example:
 *                 general_List:
 *                   - id: "701"
 *                     cycle_id: "48624"
 *                     description: "A lista do primeiro trimestre é focada no bulking dos alunos que querem ficar monstros! Birllll!"
 *                     modality_id: "901"
 *                     general_list_food:
 *                       - id: "801"
 *                         food_id: "301"
 *                         nmc: 12345678
 *                         name: "Açúcar"
 *                         measure: "KG"
 *                         category: "Açúcar e doces"
 *                         description: "refinado"
 *                   - id: "702"
 *                     cycle_id: "48624"
 *                     description: "A lista do primeiro trimestre é focada no bulking dos alunos que querem ficar monstros! Birllll!"
 *                     modality_id: "902"
 *                     general_list_food:
 *                       - id: "802"
 *                         food_id: "302"
 *                         nmc: 12345679
 *                         name: "Sal"
 *                         measure: "KG"
 *                         category: "Sal e condimentos"
 *                         description: "refinado"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /general_list/{id}:
 *   get:
 *     summary: Get a General List by ID.
 *     tags:
 *       - General Lists
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the General List to be obtained.
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
 *                 $ref: '#/components/schemas/GeneralList'
 *               example:
 *                 general_List:
 *                   - cycle_id: "48624"
 *                     description: "A lista do primeiro trimestre é focada no bulking dos alunos que querem ficar monstros! Birllll!"
 *                     modality_id: "901"
 *                     general_list_food:
 *                       - id: "801"
 *                         food_id: "301"
 *                         nmc: 12345678
 *                         name: "Açúcar"
 *                         measure: "KG"
 *                         category: "Açúcar e doces"
 *                         description: "refinado"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /general_list/cycle/{cycle_id}:
 *   get:
 *     summary: Get General Lists by Cycle ID.
 *     tags:
 *       - General Lists
 *     parameters:
 *       - in: path
 *         name: cycle_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cycle to filter General Lists.
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
 *                 $ref: '#/components/schemas/GeneralList'
 *               example:
 *                 - id: "701"
 *                   cycle_id: "48624"
 *                   description: "A lista do primeiro trimestre é focada no bulking dos alunos que querem ficar monstros! Birllll!"
 *                   modality_id: "901"
 *                   modality_name: "Educação Básica - Tempo Parcial"
 *                   general_list_food:
 *                     - id: "301"
 *                       nmc: 12345678
 *                       name: "Açúcar"
 *                       measure: "KG"
 *                       category: "Açúcar e doces"
 *                       description: "refinado"
 *                 - id: "704"
 *                   cycle_id: "48624"
 *                   description: "A lista do quarto trimestre é focada no bulking dos alunos que querem ficar monstros! Birllll!"
 *                   modality_id: "904"
 *                   modality_name: "Educação Indígena - Tempo Integral"
 *                   general_list_food: []
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /general_list/school/{school_id}/cycle/{cycle_id}:
 *   get:
 *     summary: Get General Lists by School ID and Cycle ID.
 *     tags:
 *       - General Lists
 *     parameters:
 *       - in: path
 *         name: school_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the school to filter General Lists.
 *       - in: path
 *         name: cycle_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cycle to filter General Lists.
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
 *                 $ref: '#/components/schemas/GeneralList'
 *               example:
 *                 - cycle_id: "48624"
 *                   description: "A lista do primeiro trimestre é focada no bulking dos alunos que querem ficar monstros! Birllll!"
 *                   modality_id: "901"
 *                   modality_name: "Educação Básica - Tempo Parcial"
 *                   general_list_food:
 *                     - id: "301"
 *                       nmc: 12345678
 *                       name: "Açúcar"
 *                       measure: "KG"
 *                       category: "Açúcar e doces"
 *                       description: "refinado"
 *                 - id: "704"
 *                   cycle_id: "48624"
 *                   description: "A lista do quarto trimestre é focada no bulking dos alunos que querem ficar monstros! Birllll!"
 *                   modality_id: "904"
 *                   modality_name: "Educação Indígena - Tempo Integral"
 *                   general_list_food: []
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /general_list/create:
 *   post:
 *     summary: Create a new General List.
 *     tags:
 *       - General Lists
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/GeneralList'
 *             example:
 *               description: "Nome da lista geral de alimentos"
 *               cycle_id: "48624"
 *               modality_id: "907"
 *               general_list_itens: ["301"]
 * 
 *     responses:
 *       '201':
 *         description: General List created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralList'
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /general_list/{id}:
 *   put:
 *     summary: Update a General List by ID.
 *     tags:
 *       - General Lists
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the General List to be updated.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/GeneralList'
 *             example:
 *               description: "Nome da lista geral de alimentos"
 *               cycle_id: "48624"
 *               modality_id: "907"
 *               general_list_food: 
 *                 - food_id: "302"
 *                   nmc: 12345679
 *                   measure: "KG"
 *                   category: "Sal e condimentos"
 *                   description: "refinado"
 *     responses:
 *       '200':
 *         description: General List updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralList'
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: General List not found.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /general_list/update/{id}:
 *   put:
 *     summary: Update a General List by ID.
 *     tags:
 *       - General Lists
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the General List to be updated.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/GeneralList'
 *             example:
 *               description: "Nome da lista geral de alimentos"
 *               cycle_id: "48624"
 *               modality_id: "907"
 *               general_list_removed: 
 *                 - "301"
 *               general_list_itens: 
 *                 - "302"
 *     responses:
 *       '200':
 *         description: General List updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneralList'
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: General List not found.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /general_list/{id}:
 *   delete:
 *     summary: Delete a General List by ID.
 *     tags:
 *       - General Lists
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the General List to be deleted.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '204':
 *         description: General List deleted successfully.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /general_list/school/{school_id}:
 *   get:
 *     summary: Get General Lists by School ID.
 *     tags:
 *       - General Lists
 *     parameters:
 *       - in: path
 *         name: school_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the school to filter General Lists.
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
 *                 $ref: '#/components/schemas/GeneralList'
 *               example:
 *                 - id: "5005"
 *                   modality:
 *                     id: "905"
 *                     general_list:
 *                       - id: "705"
 *                         general_list_food: []
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */
