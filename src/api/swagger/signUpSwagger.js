/**
 * @swagger
 * components:
 *   schemas:
 *     signUpRouter:
 *       type: object
 *       properties:
 *         cnpj:
 *           type: string
 *           description: CNPJ of the user (supplier).
 *         company_name:
 *           type: string
 *           description: Name of the company.
 *         trade_name:
 *           type: string
 *           description: Trade name of the company.
 *         state_registration:
 *           type: string
 *           description: State registration of the company.
 *         cnae:
 *           type: string
 *           description: CNAE code of the company.
 *         nire:
 *           type: string
 *           description: NIRE (National Registry of Legal Entities) of the company.
 *         phone:
 *           type: string
 *           description: Phone number of the user.
 *         email:
 *           type: string
 *           description: Email address of the user.
 *         tech_manager:
 *           type: string
 *           description: Technical manager of the company.
 *         status:
 *           type: string
 *           description: Status of the user.
 *         password:
 *           type: string
 *           description: Password for the user.
 *         zip:
 *           type: string
 *           description: ZIP code of the user's address.
 *         street:
 *           type: string
 *           description: Street of the user's address.
 *         number:
 *           type: string
 *           description: Number of the user's address.
 *         complement:
 *           type: string
 *           description: Complement of the user's address.
 *         district:
 *           type: string
 *           description: District of the user's address.
 *         city:
 *           type: string
 *           description: City of the user's address.
 *         state:
 *           type: string
 *           description: State of the user's address.
 *         immediate_region:
 *           type: string
 *           description: Immediate region of the user's address.
 *         intermediate_region:
 *           type: string
 *           description: Intermediate region of the user's address.
 *       required:
 *         - cnpj
 *         - company_name
 *         - trade_name
 *         - state_registration
 *         - cnae
 *         - nire
 *         - phone
 *         - email
 *         - tech_manager
 *         - status
 *         - password
 *         - zip
 *         - street
 *         - number
 *         - complement
 *         - district
 *         - city
 *         - state
 *         - immediate_region
 *         - intermediate_region
 */

/**
 * @swagger
 * /signup/create:
 *   post:
 *     summary: Create a new user (supplier)
 *     tags: [Register new supplier]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/signUpRouter'  
 *             example:
 *               cnpj: 12.345.678/0001-90
 *               company_name: Loja de caixões
 *               trade_name: Funerária noite e dia
 *               state_registration: string
 *               cnae: "1234567"
 *               nire: "12345678901"
 *               phone: "82912345678"
 *               email: abc@gmail.com
 *               tech_manager: fulano
 *               status: concluido
 *               password: string
 *               zip: string
 *               street: string
 *               number: "15"
 *               complement: string
 *               district: string
 *               city: string
 *               state: string
 *               immediate_region: string
 *               intermediate_region: string
 *     responses:
 *       '201':
 *         description: User (supplier) created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               newAddress:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   zip:
 *                     type: string
 *                   street:
 *                     type: string
 *                   number:
 *                     type: string
 *                   complement:
 *                     type: string
 *                   district:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   immediate_region:
 *                     type: string
 *                   intermediate_region:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updateAt:
 *                     type: string
 *               newUser:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   name:
 *                     type: string
 *                   role:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updateAt:
 *                     type: string
 *                   lastLogin:
 *                     type: string
 *                   active:
 *                     type: boolean
 *               newSupplier:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   cnpj:
 *                     type: string
 *                   nire:
 *                     type: string
 *                   comapany_name:
 *                     type: string
 *                   trade_name:
 *                     type: string
 *                   state_registration:
 *                     type: string
 *                   cnae:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   email:
 *                     type: string
 *                   tech_manager:
 *                     type: string
 *                   status:
 *                     type: string
 *                   user_id:
 *                     type: string
 *                   address_id:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updateAt:
 *                     type: string
 *                   
 *               example:
 *                 - newAddress:
 *                     id: letras e numeros
 *                     zip: string
 *                     street: string
 *                     number: "15"
 *                     complement: string
 *                     district: string
 *                     city: string
 *                     state: string
 *                     immediate_region: string
 *                     intermediate_region: string
 *                     createdAt: 2024-01-11T15:39:23.143Z
 *                     updateAt: 2024-01-11T15:39:23.143Z
 *                 - newUser:
 *                     id: numeros
 *                     email: abc@gmail.com
 *                     name: nome da loja
 *                     role: fornecedor
 *                     createdAt: 2024-01-11T15:39:23.143Z
 *                     updateAt: 2024-01-11T15:39:23.143Z
 *                     lastLogin: 2024-01-11 13:05:12
 *                     active: true
 *                 - newAddress:
 *                     id: letras, numeros e traços
 *                     cnpj: formato cnpj
 *                     nire: numeros
 *                     company_number: nome da companhia
 *                     trade_name: nome comercial
 *                     state_registration: letras maiúsculas e números
 *                     cnae: numeros
 *                     phone: numero do telefone
 *                     email: abc@gmail.com
 *                     tech_manager: nome
 *                     status: ativo
 *                     user_id: numeros
 *                     address_id: numeros e letras
 *                     createdAt: 2024-01-11T15:39:23.143Z
 *                     updateAt: 2024-01-11T15:39:23.143Z
 *       '409':
 *         description: User (supplier) already exists.
 *       '422':
 *         description: Unprocessable Entity - Missing required fields.
 *       '500':
 *         description: Internal Server Error.
 */
