/**
 * @swagger
 * components:
 *   schemas:
 *     SchoolAndAccessData:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           destription: SchoolAndAccessData Id.
 *         inep:
 *           type: string
 *           description: INEP code of the school.
 *         name:
 *           type: string
 *           description: Name of the school.
 *         lastAccessDate:
 *           type: string
 *           format: date-time
 *           description: Last access date of the school manager.
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
 * /user-access:
 *   get:
 *     summary: Get School and Access Data.
 *     tags:
 *       - School manager`s last access
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
 *                 $ref: '#components/schemas/SchoolAndAccessData'
 *               example:
 *                - inep: "27036731"
 *                  name: "ESCOLA ESTADUAL JOSE CORREIA DA SILVA TITARA"
 *                  lastAccessDate: "10/01/2024 14:15:30"
 *                - inep: "27036731"
 *                  name: "ESCOLA ESTADUAL JOSE CORREIA DA SILVA TITARA"
 *                  lastAccessDate: "10/01/2024 14:15:30"
 *                  description: Last access date of the school manager.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */
