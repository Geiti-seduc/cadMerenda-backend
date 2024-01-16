/**
 * @swagger
 * components:
 *   schemas:
 *     SchoolModality:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: School Modality ID
 *         school_inep:
 *           type: string
 *           description: School INEP code.
 *         modality_id:
 *           type: string
 *           description: Modality id.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp.
 */

/**
 * @swagger
 * /school_modality:
 *   get:
 *     summary: Get all School Modalities.
 *     tags: [School Modality]
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
 *                 $ref'#/components/schemas/SchoolModality'
 *               example:
 *                - id: "5001"
 *                  school_inep: "27036782"
 *                  modality_id: "901"
 *                  createdAt: "2024-01-10T16:13:32.302Z"
 *                  updatedAt: "2024-01-10T16:13:32.302Z"
 *                - id: "5002"
 *                  school_inep: "27036960"
 *                  modality_id: "902"
 *                  createdAt: "2024-01-10T16:13:32.302Z"
 *                  updatedAt: "2024-01-10T16:13:32.302Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /school_modality/{id}:
 *   get:
 *     summary: Get a School Modality by ID.
 *     tags: [School Modality]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the School Modality to be obtained.
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
 *                 $ref'#/components/schemas/SchoolModality'
 *               example:
 *                 id: "5001"
 *                 school_inep: "27036782"
 *                 modality_id: "901"
 *                 createdAt: "2024-01-10T16:13:32.302Z"
 *                 updatedAt: "2024-01-10T16:13:32.302Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /school_modality/school/{inep}:
 *   get:
 *     summary: Get School Modalities by School INEP code.
 *     tags: [School Modality]
 *     parameters:
 *       - in: path
 *         name: inep
 *         required: true
 *         schema:
 *           type: string
 *         description: INEP code of the school to filter School Modalities.
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
 *                 $ref'#/components/schemas/SchoolModality'
 *               example:
 *                 inep: "27036731"
 *                 name: "ESCOLA ESTADUAL JOSE CORREIA DA SILVA TITARA"
 *                 cnpj: "145478456577"
 *                 phone: "3454874554"
 *                 email: "escolac@gmail.com"
 *                 addressId: "22"
 *                 createdAt: "2024-01-10T16:13:31.935Z"
 *                 updatedAt: "2024-01-10T16:13:31.935Z"
 *                 geeId: "413"
 *                 Address:
 *                   id: "22"
 *                   zip: "57.055-000"
 *                   street: "Av. Fernandes Lima"
 *                   number: "S/N"
 *                   complement: "CEPA"
 *                   district: "Farol"
 *                   city: "Maceió"
 *                   state: "Alagoas"
 *                   immediate_region: "sei lá"
 *                   intermediate_region: "não sei também"
 *                   createdAt: "2024-01-10T16:13:31.536Z"
 *                   updatedAt: "2024-01-10T16:13:31.536Z"
 *                   modality:
 *                     - modality:
 *                         name: "Educação Indígena e Quilombola - Tempo Parcial"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /school_modality/create:
 *   post:
 *     summary: Create a new School Modality.
 *     tags: [School Modality]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref'#/components/schemas/SchoolModality'
 *             example:
 *               school_inep: "27036782"
 *               modality_id: "906"
 *     responses:
 *       '201':
 *         description: School Modality created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolModality'
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /school_modality/{id}:
 *   put:
 *     summary: Update a School Modality by ID.
 *     tags: [School Modality]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the School Modality to be updated.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref'#/components/schemas/SchoolModality'
 *             example:
 *               school_inep: "27036782"
 *               modality_id: "906"
 *     responses:
 *       '200':
 *         description: School Modality updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolModality'
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: School Modality not found.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /school_modality/{id}:
 *   delete:
 *     summary: Delete a School Modality by ID.
 *     tags: [School Modality]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the School Modality to be deleted.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '204':
 *         description: School Modality deleted successfully.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */
