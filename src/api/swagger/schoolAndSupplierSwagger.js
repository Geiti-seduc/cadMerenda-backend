/**
 * @swagger
 * components:
 *   schemas:
 *     SchoolAndSupplier:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             description: ID of the user.
 *           email:
 *             type: string
 *             description: Email of the user.
 *           name:
 *             type: string
 *             description: Name of the user.
 *           password:
 *             type: string
 *             description: Password of the user.
 *           role:
 *             type: string
 *             description: Role of the user.
 *           lastLogin:
 *             type: string
 *             format: date-time
 *             description: Last login date of the user.
 *           school_user:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 school:
 *                   type: object
 *                   properties:
 *                     inep:
 *                       type: string
 *                       description: INEP code of the school.
 *               example:
 *                 - id: 10344544741
 *                   email: "a@a.com"
 *                   name: "Gestor da MOREIRA E SILVA"
 *                   password: "$2b$12$0W6eEUQPjxonOcpJUywOiuYXp5ENE5opjBdTHMpRpuHHPjgrZAmvC"
 *                   role: "gestor"
 *                   lastLogin: "2024-01-10 14:15:30"
 *                   school_user:
 *                     - school:
 *                         inep: "27036731"
 *                     - school:
 *                         inep: "27036782"
 *                 - id: 123456
 *                   email: "anderson@teste.com"
 *                   name: "Anderson"
 *                   password: "$2b$12$qcMzU4/ZakAVf6qjDBCB7uFobVVgIy.i3e14zcFJTleDMsk0x2mu6"
 *                   role: "nutricionista"
 *                   lastLogin: "2024-01-02T13:36:06.172Z"
 *                   school_user: []
 */

/**
 * @swagger
 * /school-for-supplier:
 *   get:
 *     summary: Get School and Supplier Data.
 *     tags:
 *       - school And Supplier
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolAndAccessData'
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */