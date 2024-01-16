/**
 * @swagger
 * components:
 *   schemas:
 *     Certificate:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Certificate ID.
 *         user_id:
 *           type: string
 *           description: User ID associated with the certificate.
 *         required_certificate_id:
 *           type: string
 *           description: Associated mandatory certificate ID.
 *         expiration:
 *           type: string
 *           format: date-time
 *           description: Certificate expiration date.
 *         archive:
 *           type: string
 *           description: Path or name of the file associated with the certificate.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Certificate creation date and time.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time of last certificate update.
 */

/**
 * @swagger
 * /certificate:
 *   get:
 *     summary: Get all certificates.
 *     tags:
 *       - Certificate
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Certificate'
 *               example:
 *                - id: 00
 *                  user_id: 00000000000
 *                  required_certificate_id: 0
 *                  expiration: 2024-01-02T08:47:27.738Z
 *                  archive: www.string.com
 *                  createdAt: 2024-01-02T08:47:27.738Z
 *                  updateAt: 2024-02-02T08:47:27.738Z
 *                - id: "11"
 *                  user_id: "11111111111"
 *                  required_certificate_id: "1"
 *                  expiration: 2025-01-02T08:47:27.738Z
 *                  archive: www.string2.com
 *                  createdAt: 2024-02-02T08:47:27.738Z
 *                  updateAt: 2024-05-02T08:47:27.738Z
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /certificate/{id}:
 *   get:
 *     summary: Get a certificate by ID.
 *     tags:
 *       - Certificate
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the certificate to retrieve.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  user_id:
 *                    type: string
 *                  required_certificate_id:
 *                    type: string
 *                  expiration:
 *                    type: string
 *                  archive:
 *                    type: string
 *                  createdAt:
 *                    type: string
 *                  updateAt:
 *                    type: string
 *                
 *                example:
 *                  id: "00"
 *                  user_id: "00000000000"
 *                  required_certificate_id: "0"
 *                  expiration: 2024-01-02T08:47:27.738Z
 *                  archive: www.string.com
 *                  createdAt: 2024-01-02T08:47:27.738Z
 *                  updateAt: 2024-02-02T08:47:27.738Z
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Certificate not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /certificate/{id}:
 *   delete:
 *     summary: Delete a certificate by ID.
 *     tags:
 *       - Certificate
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the certificate to delete.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '204':
 *         description: Certificate deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Certificate not found
 *       '500':
 *         description: Internal Server Error
 */

// obs.: O put e post estão no arquivo