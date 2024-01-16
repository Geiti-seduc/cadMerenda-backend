/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Default:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *       required:
 *         - email
 *         - password
 *
 *     User:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token
 *         role:
 *           type: string
 *           description: User role
 *         userId:
 *           type: string
 *           description: User ID
 *
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user and get a JWT token
 *     tags:
 *       - Default
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email.
 *               password:
 *                 type: string
 *                 description: User password.
 *             example:
 *               email: "user@example.com"
 *               password: "string"
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token.
 *                 role:
 *                   type: string
 *                   description: User role.
 *                 userId:
 *                   type: string
 *                   description: User Id.
 *               example:
 *                 token: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
 *                 role: "admin-nutri"
 *                 userId: "10356451302"
 *       '401':
 *         description: Incorrect email or password
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Default
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: User CPF.
 *               email:
 *                 type: string
 *                 description: User email.
 *               name:
 *                 type: string
 *                 description: User name.
 *               password:
 *                 type: string
 *                 description: User password.
 *               role:
 *                 type: string
 *                 description: User role.
 *               active:
 *                 type: string
 *                 description: active.
 *             example:
 *               id: "99999999999"
 *               email: "newuser@newuser.com"
 *               name: "Example name"
 *               password: "examplePassword"
 *               role: "admin"
 *               active: true
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User CPF.
 *                 email:
 *                   type: string
 *                   description: User email.
 *                 name:
 *                   type: string
 *                   description: User name.
 *                 password:
 *                   type: string
 *                   description: User password.
 *                 role:
 *                   type: string
 *                   description: User role.
 *                 active:
 *                   type: string
 *                   description: active.
 *               example:
 *                 id: "99999999999"
 *                 email: "newuser@newuser.com"
 *                 name: "Example name"
 *                 password: "examplePassword"
 *                 role: "admin"
 *                 createdAt: "2024-01-15T14:08:43.159Z"
 *                 updatedAt: "2024-01-15T14:08:43.159Z"
 *                 lastLogin: "2024-01-15 11:08:42"
 *                 active: true
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /token/{token}:
 *   post:
 *     summary: Return user information based on the provided JWT token
 *     tags:
 *       - Default
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token to decode and retrieve user information
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '422':
 *         description: Token not informed
 *       '401':
 *         description: Unauthorized - Invalid token or expired token
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /forgot-password/token:
 *   post:
 *     summary: Send an email with a password reset link
 *     tags:
 *       - Default
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email for password reset
 *             required:
 *               - email
 *     responses:
 *       '200':
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Email not informed
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /forgot-password/newPassword/{token}:
 *   post:
 *     summary: Reset user password based on the provided JWT token
 *     tags:
 *       - Default
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token for password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: New password for the user
 *               confirmPassword:
 *                 type: string
 *                 description: Confirm new password for the user
 *             required:
 *               - newPassword
 *               - confirmPassword
 *     responses:
 *       '200':
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Token not informed or invalid
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /forgot-password/updateUser/{id}:
 *   put:
 *     summary: Update user password after password reset
 *     tags:
 *       - Default
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: New password for the user
 *               confirmPassword:
 *                 type: string
 *                 description: Confirm new password for the user
 *             required:
 *               - newPassword
 *               - confirmPassword
 *     responses:
 *       '200':
 *         description: Password update successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       '404':
 *         description: User not found
 *       '422':
 *         description: One or more fields not informed or incorrect password
 *       '500':
 *         description: Internal Server Error
 */
