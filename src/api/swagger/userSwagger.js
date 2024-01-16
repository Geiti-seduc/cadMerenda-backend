/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: User Id
 *         email:
 *           type: string
 *           description: User Id
 *         name:
 *           type: string
 *           description: User Id
 *         password:
 *           type: string
 *           description: User Id
 *         role:
 *           type: string
 *           description: User Id
 *         createdAt:
 *           type: string
 *           description: User Id
 *         updatedAt:
 *           type: string
 *           description: User Id
 *         lastLogin:
 *           type: string
 *           description: User Id
 *         active:
 *           type: string
 *           description: User Id
 */

/**
 * @swagger
 * /user:
 *   get:
 *     sumary: Get all users
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of suppliers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'      
 *               example:
 *               - id: 123456789-85
 *                 email: eds@gmail.com
 *                 name: Elso dos santos
 *                 role: gestor
 *                 createAt: 2024-01-11T18:06:43.217Z
 *                 updateAt: 2024-01-11T18:06:43.217Z
 *                 lastLogin: 2024-01-11 15:06:42
 * 
 *                 active: false
 *               - id: 167356789-85
 *                 email: edsadds@gmail.com
 *                 name: Elson dos santos
 *                 role: gestor
 *                 createAt: 2024-01-11T18:06:43.217Z
 *                 updateAt: 2024-01-11T18:06:43.217Z
 *                 lastLogin: 2024-01-11 15:06:42
 *                 active: true
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/inactive:
 *   get:
 *     summary: Get inactive users
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of inactive users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *               example:
 *               - id: 123456789-85
 *                 email: eds@gmail.com
 *                 name: Elso dos santos
 *                 role: gestor
 *                 createAt: 2024-01-11T18:06:43.217Z
 *                 updateAt: 2024-01-11T18:06:43.217Z
 *                 lastLogin: 2024-01-11 15:06:42
 *                 active: false
 *                 school_user:
 *                 - id: "6001"
 *                   role: Gestor
 *                   school_inep: numeros
 *                   user_id: mais numeros
 *                   createAt: 2024-01-11T15:54:43.486Z
 *                   upadateAt: 2024-01-11T15:54:43.486Z
 * 
 *                 - id: "7801"
 *                   role: Gestor
 *                   school_inep: numeros
 *                   user_id: mais numeros
 *                   createAt: 2024-01-11T15:54:43.486Z
 *                   upadateAt: 2024-01-11T15:54:43.486Z
 * 
 *               - id: 123456789-85
 *                 email: eds@gmail.com
 *                 name: Elso dos santos
 *                 role: gestor
 *                 createAt: 2024-01-11T18:06:43.217Z
 *                 updateAt: 2024-01-11T18:06:43.217Z
 *                 lastLogin: 2024-01-11 15:06:42
 *                 active: false
 *                 school_user:
 *                 - id: "6001"
 *                   role: Gestor
 *                   school_inep: numeros
 *                   user_id: mais numeros
 *                   createAt: 2024-01-11T15:54:43.486Z
 *                   upadateAt: 2024-01-11T15:54:43.486Z
 * 
 *                 - id: "7801"
 *                   role: Gestor
 *                   school_inep: numeros
 *                   user_id: mais numeros
 *                   createAt: 2024-01-11T15:54:43.486Z
 *                   upadateAt: 2024-01-11T15:54:43.486Z
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/User'
 *               example:
 *               - email: eds@gmail.com
 *                 name: Elso dos santos
 *                 role: gestor
 *                 createAt: 2024-01-11T18:06:43.217Z
 *                 updateAt: 2024-01-11T18:06:43.217Z
 *                 lastLogin: 2024-01-11 15:06:42
 *                 active: false
 *                 school_user:
 *                 - id: "6001"
 *                   role: Gestor
 *                   school_inep: numeros
 *                   user_id: mais numeros
 *                   createAt: 2024-01-11T15:54:43.486Z
 *                   upadateAt: 2024-01-11T15:54:43.486Z
 *                 - id: "7801"
 *                   role: Gestor
 *                   school_inep: numeros
 *                   user_id: mais numeros
 *                   createAt: 2024-01-11T15:54:43.486Z
 *                   upadateAt: 2024-01-11T15:54:43.486Z
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               name: Elso dos santos
 *               id: 123456789-85
 *               email: eds@gmail.com
 *               role: gestor
 *               password: "************"
 *     responses:
 *       '201':
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             example:
 *               id: 123456789-85
 *               email: eds@gmail.com
 *               name: Elso dos santos
 *               role: gestor
 *               createAt: 2024-01-11T18:06:43.217Z
 *               updateAt: 2024-01-11T18:06:43.217Z
 *               lastLogin: 2024-01-11 15:06:42
 *               active: true
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/createAndAssociateToSchool:
 *   post:
 *     summary: Create a new user and associate to school
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               id: "10190"
 *               name: Loja de caixões
 *               email: ac@gmail.com
 *               password: "********"
 *               role: gestor
 *               schoolInep: "27036731"
 *     responses:
 *       '201':
 *         description: User created and associated to school successfully
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/userInfo/{email}:
 *   get:
 *     summary: Get user information by email
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: User's email address
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             example:
 *               id: 123456789-85
 *               name: Elso dos santos
 *               role: gestor
 *               createAt: 2024-01-11T18:06:43.217Z
 *               updateAt: 2024-01-11T18:06:43.217Z
 *               lastLogin: 2024-01-11 15:06:42
 *               active: true
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete an user by id (just admin is allowed to delete).
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: User deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/User'  # Referência ao esquema User
 *             example:
 *               name: STRING
 *               email: STRING@ab.com
 *               role: gestor
 *               password: string
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/User'  # Referência ao esquema User
 *               example:
 *                 email: STRING@ab.com
 *                 name: STRING
 *                 hashedPassword: letras e numeros
 *                 role: gestor
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */
