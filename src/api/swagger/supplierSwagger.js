/**
 * @swagger
 * components:
 *   schemas:
 *     Supplier:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Identifier of the supplier.
 *         cnpj:
 *           type: string
 *           description: CNPJ of the supplier.
 *         nire:
 *           type: string
 *           description: NIRE (Número de Identificação do Registro de Empresas) of the supplier.
 *         company_name:
 *           type: string
 *           description: Legal name of the supplier.
 *         trade_name:
 *           type: string
 *           description: Trade name of the supplier.
 *         state_registration:
 *           type: string
 *           description: State registration of the supplier.
 *         cnae:
 *           type: string
 *           description: CNAE (Classificação Nacional de Atividades Econômicas) code of the supplier.
 *         phone:
 *           type: string
 *           description: Phone number of the supplier.
 *         email:
 *           type: string
 *           description: Email address of the supplier.
 *         tech_manager:
 *           type: string
 *           description: Technical manager of the supplier.
 *         status:
 *           type: string
 *           description: Status of the supplier.
 *         user_id:
 *           type: string
 *           description: User ID associated with the supplier.
 *         address_id:
 *           type: string
 *           description: Address ID associated with the supplier.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp indicating the creation time of the supplier.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp indicating the last update time of the supplier.
 *         address:
 *            type: object
 *            properties:
 *             id:
 *               type: string
 *             zip:
 *               type: string
 *             street:
 *               type: string
 *             number:
 *               type: string
 *             complement:
 *               type: string
 *            district:
 *               type: string
 *            city:
 *               type: string
 *            state:
 *               type: string
 *            immediate_region:
 *               type: string
 *            intermediate_region:
 *               type: string
 *            createdAt:
 *               type: string
 *               format: date-time
 *            updatedAt:
 *               type: string
 *               format: date-time
 */

/**
 * @swagger
 * /supplier:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Supplier]
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
 *                 $ref: '#/components/schemas/Supplier'
 *               example:
 *                 - id: "101"
 *                   cnpj: "06.057.223/0001-71"
 *                   nire: "35.300.158.659"
 *                   company_name: "Assaí Atacadista"
 *                   trade_name: "SENDAS DISTRIBUIDORA S/A"
 *                   state_registration: "1"
 *                   cnae: "47.11-3-02"
 *                   phone: "3003-3030"
 *                   email: "assaiatacadista@assai.com"
 *                   tech_manager: "Rodolfo Jungi Nagai"
 *                   status: null
 *                   user_id: "78412044741"
 *                   address_id: "10"
 *                   createdAt: "2024-01-11T14:36:23.311Z"
 *                   updatedAt: "2024-01-11T14:36:23.311Z"
 *                 - id: "102"
 *                   cnpj: "01484794000179"
 *                   nire: "35.300.158.660"
 *                   company_name: "Palato"
 *                   trade_name: "PALATO IND E COM DE PRODUTOS ALIMENTICIOS LTDA"
 *                   state_registration: "2"
 *                   cnae: "47.12-1-00"
 *                   phone: "4004-7200"
 *                   email: "sac@palato.com.br."
 *                   tech_manager: " Paulo Cabús e Susana Cabús"
 *                   status: null
 *                   user_id: "45123654874"
 *                   address_id: "22"
 *                   createdAt: "2024-01-11T14:36:23.311Z"
 *                   updatedAt: "2024-01-11T14:36:23.311Z"
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /supplier/{id}:
 *   get:
 *     summary: Get a supplier by ID
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the supplier to get
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A single supplier
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Supplier'
 *               example:
 *                 id: "101"
 *                 cnpj: "06.057.223/0001-71"
 *                 nire: "35.300.158.659"
 *                 company_name: "Assaí Atacadista"
 *                 trade_name: "SENDAS DISTRIBUIDORA S/A"
 *                 state_registration: "1"
 *                 cnae: "47.11-3-02"
 *                 phone: "3003-3030"
 *                 email: "assaiatacadista@assai.com"
 *                 tech_manager: "Rodolfo Jungi Nagai"
 *                 status: null
 *                 user_id: "78412044741"
 *                 address_id: "10"
 *                 createdAt: "2024-01-11T14:36:23.311Z"
 *                 updatedAt: "2024-01-11T14:36:23.311Z"
 *                 address:
 *                   id: "10"
 *                   zip: "57.030-010"
 *                   street: "Rua Epaminondas Gracindo"
 *                   number: "238"
 *                   complement: "prédio"
 *                   district: "Pajuçara"
 *                   city: "Maceió"
 *                   state: "Alagoas"
 *                   immediate_region: "sei lá"
 *                   intermediate_region: "não sei também"
 *                   createdAt: "2024-01-11T14:36:23.197Z"
 *                   updatedAt: "2024-01-11T14:36:23.197Z"
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /supplier/user/{user_id}:
 *   get:
 *     summary: Get a supplier by user ID
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to get the corresponding supplier
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A single supplier
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Supplier'
 *               example:
 *                 id: "101"
 *                 cnpj: "06.057.223/0001-71"
 *                 nire: "35.300.158.659"
 *                 company_name: "Assaí Atacadista"
 *                 trade_name: "SENDAS DISTRIBUIDORA S/A"
 *                 state_registration: "1"
 *                 cnae: "47.11-3-02"
 *                 phone: "3003-3030"
 *                 email: "assaiatacadista@assai.com"
 *                 tech_manager: "Rodolfo Jungi Nagai"
 *                 status: null
 *                 user_id: "78412044741"
 *                 address_id: "10"
 *                 createdAt: "2024-01-11T16:31:10.111Z"
 *                 updatedAt: "2024-01-11T16:31:10.111Z"
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
