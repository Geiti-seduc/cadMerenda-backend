/**
 * @swagger
 * components:
 *   schemas:
 *     School:
 *       type: object
 *       properties:
 *         inep:
 *           type: string
 *           description: School inep
 *         name:
 *           type: string
 *           description: School name
 *         cnpj:
 *           type: string
 *           description: School CNPJ
 *         phone:
 *           type: string
 *           description: Phone number of the school
 *         email:
 *           type: string
 *           description: email school
 *         addressId:
 *           type: string
 *           description: School address ID
 *         createdAt:
 *           type: string
 *           description: Creation timestamp.
 *         updatedAt:
 *           type: string
 *           description: Last update timestamp.
 *         geeId:
 *           type: string
 *           description: School Gee ID
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
 *         modalities:
 *           type: array
 *           description: Modalities of school
 *           items:
 *             type: object
 *             properties:
 *               modality:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: name of modality's school
 */

/**
 * @swagger
 * /school:
 *   get:
 *     summary: Get all schools.
 *     tags: [School]
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
 *                 $ref: '#/components/schemas/School'
 *               example:
 *                 - inep: "27026337"
 *                   name: "ESCOLA ESTADUAL FLORIANO PEIXOTO"
 *                   cnpj: "145478456577"
 *                   phone: "8232641112"
 *                   email: "floriano@peixoto.com"
 *                   addressId: "13"
 *                   createdAt: "2024-01-10T16:13:31.935Z"
 *                   updatedAt: "2024-01-10T16:13:31.935Z"
 *                   geeId: "404"
 *                   modalities:
 *                     - modality:
 *                         name: "Educação Indígena - Creches"
 *                   city: "Viçosa"
 *                 - inep: "27036731"
 *                   name: "ESCOLA ESTADUAL JOSE CORREIA DA SILVA TITARA"
 *                   cnpj: "145478456577"
 *                   phone: "3454874554"
 *                   email: "escolac@gmail.com"
 *                   addressId: "22"
 *                   createdAt: "2024-01-10T16:13:31.935Z"
 *                   updatedAt: "2024-01-10T16:13:31.935Z"
 *                   geeId: "413"
 *                   modalities:
 *                     - modality:
 *                         name: "Educação Indígena e Quilombola - Tempo Parcial"
 *                   city: "Maceió"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /school/{inep}:
 *   get:
 *     summary: Get school by INEP.
 *     tags: [School]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inep
 *         required: true
 *         description: INEP of the school.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/School'
 *               example:
 *                 name: "ESCOLA ESTADUAL FLORIANO PEIXOTO"
 *                 cnpj: "145478456577"
 *                 phone: "8232641112"
 *                 email: "floriano@peixoto.com"
 *                 addressId: "13"
 *                 createdAt: "2024-01-10T16:13:31.935Z"
 *                 updatedAt: "2024-01-10T16:13:31.935Z"
 *                 geeId: "404"
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
 *                 modalities:
 *                   - modality:
 *                       name: "Educação Indígena - Creches"
 *                 city: "Viçosa"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /school/city/{city}:
 *   get:
 *     summary: Get schools by city.
 *     tags: [School]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         description: City name
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/School'
 *               example:
 *                - inep: "27036731"
 *                  name: "ESCOLA ESTADUAL JOSE CORREIA DA SILVA TITARA"
 *                  cnpj: "145478456577"
 *                  phone: "3454874554"
 *                  email: "escolac@gmail.com"
 *                  addressId: "22"
 *                  createdAt: "2024-01-10T16:13:31.935Z"
 *                  updatedAt: "2024-01-10T16:13:31.935Z"
 *                  geeId: "413"
 *                - inep: "27026337"
 *                  name: "ESCOLA ESTADUAL MOREIRA E SILVA"
 *                  cnpj: "2324568784562"
 *                  phone: "9545784521"
 *                  email: "escola1@gmail.com"
 *                  addressId: "22"
 *                  createdAt: "2024-01-10T16:13:31.935Z"
 *                  updatedAt: "2024-01-10T16:13:31.935Z"
 *                  geeId: "413"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /school/gee/{gee}:
 *   get:
 *     summary: Get schools by GEE.
 *     tags: [School]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: gee
 *         required: true
 *         description: GEE id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/School'
 *               example:
 *                - inep: "27036731"
 *                  name: "ESCOLA ESTADUAL JOSE CORREIA DA SILVA TITARA"
 *                  cnpj: "145478456577"
 *                  phone: "3454874554"
 *                  email: "escolac@gmail.com"
 *                  addressId: "22"
 *                  createdAt: "2024-01-10T16:13:31.935Z"
 *                  updatedAt: "2024-01-10T16:13:31.935Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /school:
 *   post:
 *     summary: Create a new school.
 *     tags: [School]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *                 $ref: '#/components/schemas/School'
 *             example:
 *               inep: "33133531"
 *               name: "Escola Teste"
 *               cnpj: "12345678900004"
 *               phone: "123456789"
 *               email: "escola@teste.com"
 *               geeId: "401"
 *               modalities:
 *                 - id: "901"
 *               address:
 *                   zip: "57052-827"
 *                   street: "Rua Hugo Corrêa Paes"
 *                   number: "10"
 *                   complement: "CASA"
 *                   district: "Gruta de Lourdes"
 *                   city: "Maceió"
 *                   state: "AL"
 *                   immediate_region: "Maceió"
 *                   intermediate_region: "Maceió"
 *     responses:
 *       '201':
 *         description: School created successfully.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /school/{inep}:
 *   put:
 *     summary: Update a school by INEP.
 *     tags: [School]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inep
 *         required: true
 *         description: INEP of the school to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *                 $ref: '#/components/schemas/School'
 *             example:
 *               name: "Escola Teste"
 *               cnpj: "12345678900004"
 *               geeId: "401"
 *               phone: "123456789"
 *               email: "escola@teste.com"
 *               addressId: "12345678900004"
 *               added_modalities: ["906"]
 *               removed_modalities: ["901"]
 */

/**
 * @swagger
 * /school/{inep}:
 *   delete:
 *     summary: Delete a school by INEP.
 *     tags: [School]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inep
 *         required: true
 *         description: INEP of the school to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: School deleted successfully.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /school/schoolInfo/{inep}:
 *   get:
 *     tags: [School]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inep
 *         required: true
 *         description: INEP
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/School'
 *               example:
 *                 inep: "27036731"
 *                 name: "ESCOLA ESTADUAL JOSE CORREIA DA SILVA TITARA"
 *                 cnpj: "145478456577"
 *                 phone: "3454874554"
 *                 email: "escolac@gmail.com"
 *                 addressId: "22"
 *                 createdAt: "2024-01-11T14:36:23.926Z"
 *                 updatedAt: "2024-01-11T14:36:23.926Z"
 *                 geeId: "413"
 *                 Address:
 *                   id: "22"
 *                   zip: "57.055-000"
 *                   street: "Av. Fernandes Lima"
 *                   number: "S/N"
 *                   complement: "CEPA"
 *                   district: "Farol"
 *                   city: "Maceió"
 *                   state: "Alagoas"
 *                   immediate_region: "sei lá"
 *                   intermediate_region: "não sei também"
 *                   createdAt: "2024-01-11T14:36:23.198Z"
 *                   updatedAt: "2024-01-11T14:36:23.198Z"
 *                 modalities:
 *                   - modality:
 *                       name: "Educação Indígena e Quilombola - Tempo Parcial"
 *                 city: "Maceió"
 *                 users:
 *                   - id: "23596552236"
 *                     email: "t@t.com"
 *                     name: "Gestor TITARA"
 *                     role: "Gestor"
 *                     lastLogin: "2024-01-02T13:36:06.172Z"
 *                     active: true
 *                     school_user:
 *                       - id: "6003"
 *                         role: "Gestor"
 *                         school_inep: "27036731"
 *                         user_id: "23596552236"
 *                         createdAt: "2024-01-11T14:36:24.758Z"
 *                         updatedAt: "2024-01-11T14:36:24.758Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */
