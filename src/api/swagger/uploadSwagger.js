/**
 * @swagger
 * components:
 *   schemas:
 *     Upload:
 *       type: object
 *       properties:
 *         required_certificate_id:
 *           type: string
 *           description: The ID of the required certificate.
 *         expiration:
 *           type: string
 *           format: date-time
 *           description: Certificate expiration date.
 *         archive:
 *           type: string
 *           description: Path or name of the file associated with the certificate.
 *       required:
 *         - required_certificate_id
 *         - expiration
 *         - archive
 */

/**
 * @swagger
 * /upload/create/{archName}/{userId}:
 *   post:
 *     summary: Create a new certificate.
 *     tags:
 *       - Certificate
 *     parameters:
 *       - in: path
 *         name: archName
 *         schema:
 *           type: string
 *         description: The name of the archive.
 *         required: true
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *         required: true
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Upload'
 *     responses:
 *       '201':
 *         description: Certificate created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /upload/update/{required_certificate_id}/{archName}/{userId}:
 *   put:
 *     summary: Update a certificate.
 *     tags:
 *       - Certificate
 *     parameters:
 *       - in: path
 *         name: required_certificate_id
 *         schema:
 *           type: string
 *         description: The ID of the required certificate.
 *         required: true
 *       - in: path
 *         name: archName
 *         schema:
 *           type: string
 *         description: The name of the archive.
 *         required: true
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *         required: true
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Upload'
 *     responses:
 *       '200':
 *         description: Certificate updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Certificate'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Certificate not found
 *       '500':
 *         description: Internal Server Error
 */
