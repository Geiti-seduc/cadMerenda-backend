/**
 * @swagger
 * components:
 *   schemas:
 *     UserAndSchool:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         role:
 *           type: string
 *         lastLogin:
 *           type: string
 *           format: date-time
 *         school_user:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               school:
 *                 type: object
 *                 properties:
 *                   inep:
 *                     type: string
 */

/**
 * @swagger
 * /user-and-school:
 *   get:
 *     summary: Get all users and associated schools
 *     tags: [User and school]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved all users and associated schools
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserAndSchool'
 *               example:
 *               - id: numeros
 *                 email: spqr@gmail.com
 *                 name: É o som
 *                 password: "*******"
 *                 role: fornecedor
 *                 lastLogin: data e hora
 *                 school_user:
 *                 - school:
 *                     inep: numeros
 *                 - school:
 *                     inep: numeros
 * 
 *               - id: numeros
 *                 email: wds@gmail.com
 *                 name: Fulano
 *                 password: "*********"
 *                 role: gestor
 *                 lastLogin: data e hora
 *                 school_user: []
 *               
 *               - id: numeros
 *                 email: ac@gmail.com
 *                 name: Sicrano
 *                 password: "***********************"
 *                 role: gestor
 *                 lastLogin: data e hora
 *                 school_user:
 *                 - school:
 *                    inep: numeros
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */