/**
 * @swagger
 * components:
 *   schemas:
 *     RequiredCertificate:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Id of the required certificate.
 *         name:
 *           type: string
 *           description: Name of the required certificate.
 *         createdAt:
 *           type: string
 *           description: Creation timestamp.
 *         updatedAt:
 *           type: string
 *           description: Last update timestamp.
 */

/**
 * @swagger
 * /required-certificate:
 *   get:
 *     summary: Get all required certificates.
 *     tags:
 *       - Required Certificates
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
 *                 $ref: '#/components/schemas/RequiredCertificate'
 *               example:
 *                - id: "1"
 *                  name: "CND MUNICIPAL"
 *                  createdAt: "2024-01-11T17:08:09.270Z"
 *                  updatedAt: "2024-01-11T17:08:09.270Z"
 *                - id: "2"
 *                  name: "CND ESTADUAL"
 *                  createdAt: "2024-01-11T17:08:09.270Z"
 *                  updatedAt: "2024-01-11T17:08:09.270Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /required-certificate/{id}:
 *   get:
 *     summary: Get a required certificate by ID.
 *     tags:
 *       - Required Certificates
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the required certificate.
 *         schema:
 *           type: string
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
 *                 $ref: '#/components/schemas/RequiredCertificate'
 *               example:
 *                - id: "1"
 *                  name: "CND MUNICIPAL"
 *                  createdAt: "2024-01-11T17:08:09.270Z"
 *                  updatedAt: "2024-01-11T17:08:09.270Z"
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Required certificate not found.
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /required-certificate/expiration/{id}:
 *   get:
 *     summary: Get a required certificate by ID.
 *     tags:
 *       - Required Certificates
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the required certificate.
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RequiredCertificate'
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Required certificate not found.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /required-certificate/create:
 *   post:
 *     summary: Create a new required certificate.
 *     tags:
 *       - Required Certificates
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/RequiredCertificate'
 *             example:
 *               name: "Nome da nova certidão requerida"
 *     responses:
 *       '201':
 *         description: Required certificate created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Id of the required certificate.
 *                 name:
 *                   type: string
 *                   description: Name of the required certificate.
 *                 createdAt:
 *                   type: string
 *                   description: Creation timestamp.
 *                 updatedAt:
 *                   type: string
 *                   description: Last update timestamp.
 *               example:
 *                 id: "9999"
 *                 name: "Nome da nova certidão requerida"
 *                 createdAt: "2024-01-11T17:08:09.270Z"
 *                 updatedAt: "2024-01-11T17:08:09.270Z"
 *       '400':
 *         description: Bad request, invalid input.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /required-certificate/{id}:
 *   put:
 *     summary: Update a required certificate by ID.
 *     tags:
 *       - Required Certificates
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the required certificate.
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/RequiredCertificate'
 *             example:
 *               name: "Nome da nova certidão requerida atualizada"
 *     responses:
 *       '200':
 *         description: Required certificate updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Id of the required certificate.
 *                 name:
 *                   type: string
 *                   description: Name of the required certificate.
 *                 createdAt:
 *                   type: string
 *                   description: Creation timestamp.
 *                 updatedAt:
 *                   type: string
 *                   description: Last update timestamp.
 *               example:
 *                 id: "9999"
 *                 name: "Nome da nova certidão requerida atualizada"
 *                 createdAt: "2024-01-11T17:08:09.270Z"
 *                 updatedAt: "2024-01-11T17:08:09.270Z"
 *       '400':
 *         description: Bad request, invalid input.
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Required certificate not found.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /required-certificate/{id}:
 *   delete:
 *     summary: Delete a required certificate by ID.
 *     tags:
 *       - Required Certificates
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the required certificate to delete.
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '204':
 *         description: Required certificate deleted successfully.
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Required certificate not found.
 *       '500':
 *         description: Internal Server Error.
 */
