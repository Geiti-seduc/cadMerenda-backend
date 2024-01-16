/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Address id.
 *         zip:           
 *           type: string
 *           description: Address zip code.
 *         street:
 *           type: string
 *           description: Name of the street.
 *         number:
 *           type: string
 *           description: Address number.
 *         complement:
 *           type: string
 *           description: Address complement (optional).
 *         district:
 *           type: string
 *           description: Address district.
 *         city:
 *           type: string
 *           description: City of address.
 *         state:
 *           type: string
 *           description: State of address.
 *         immediate_region:
 *           type: string
 *           description: Immediate region of the address (optional).
 *         intermediate_region:
 *           type: string
 *           description: Intermediate address region (optional).
 *         createdAt:
 *           type: string
 *           format: data-type
 *           description: Record creation date and time.
 *         updatedAt:
 *           type: string
 *           format: data-type
 *           description: Date and time of last record update.
 */
/**
 * @swagger
 * /address:
 *   get:
 *     x-order: 1
 *     summary: Get all addresses.
 *     tags:
 *       - Address
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
 *                 $ref: '#/components/schemas/Address'
 *               example:
 *                 - id: "10"
 *                   zip: "57.030-010"
 *                   street: "Rua Epaminondas Gracindo"
 *                   number: "238"
 *                   complement: "prédio"
 *                   district: "Pajuçara"
 *                   city: "Maceió"
 *                   state: "Alagoas"
 *                   immediate_region: "exemplo"
 *                   intermediate_region: "exemplo"
 *                   createdAt: 2024-01-09T17:36:21.438Z
 *                   updatedAt: 2024-01-09T17:40:21.438Z
 *                 - id: "11"
 *                   zip: "57.240-970"
 *                   street: "Rua Barão de Jequiá"
 *                   number: "121"
 *                   complement: "prédio"
 *                   district: "Centro"
 *                   city: "São Miguel dos Campos"
 *                   state: "Alagoas"
 *                   immediate_region: "exemplo"
 *                   intermediate_region: "exemplo"
 *                   createdAt: 2024-01-10T17:36:21.438Z
 *                   updatedAt: 2024-01-10T17:40:21.438Z
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 *       '403':
 *         description: Forbidden.
 */

/**
 * @swagger
 * /address/{address_id}:
 *   get:
 *     x-order: 2
 *     summary: Get an address by ID.
 *     tags:
 *       - Address
 *     parameters:
 *       - in: path
 *         name: address_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the address to retrieve.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Address'
 *               example:
 *                 id: "10"
 *                 zip: "57.240-970"
 *                 street: "Rua Epaminondas Gracindo"
 *                 number: "238"
 *                 complement: "prédio"
 *                 district: "Pajuçara"
 *                 city: "Maceió"
 *                 state: "Alagoas"
 *                 immediate_region: "exemplo"
 *                 intermediate_region: "exemplo"
 *                 createdAt: 2024-01-09T17:36:21.438Z
 *                 updatedAt: 2024-01-09T17:40:21.438Z
 * 
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 *       '403':
 *         description: Forbidden.
 */

/**
 * @swagger
 * /address:
 *   post:
 *     x-order: 3
 *     summary: Create a new address.
 *     tags:
 *       - Address
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 zip:
 *                   type: string
 *                 street:
 *                   type: string
 *                 number:
 *                   type: string
 *                 complement:
 *                   type: string
 *                 district:
 *                   type: string
 *                 city:
 *                   type: string
 *                 state:
 *                   type: string
 *                 immediate_region:
 *                   type: string
 *                 intermediate_region:
 *                   type: string
 *     responses:
 *       '201':
 *         description: Address created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 zip:
 *                   type: string
 *               
 *               example:
 *                 id: acac9f0a-c6f6-4344-8cd4-dcb7f838a887"
 *                 zip: string
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 *       '400':
 *         description: Bad Request.
 *       '403':
 *         description: Forbidden.
 */

/**
 * @swagger
 * /address/{address_id}:
 *   put:
 *     x-order: 4
 *     summary: Update an existing address
 *     tags:
 *       - Address
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: address_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the address to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 zip:
 *                   type: string
 *                 street:
 *                   type: string
 *                 number:
 *                   type: string
 *                 complement:
 *                   type: string
 *                 district:
 *                   type: string
 *                 city:
 *                   type: string
 *                 state:
 *                   type: string
 *                 immediate_region:
 *                   type: string
 *                 intermediate_region:
 *                   type: string
 * 
 *               example:
 *                 zip: string
 *                 street: string
 *                 number: "0"
 *                 complement: string
 *                 district: string
 *                 city: string
 *                 state: string
 *                 immediate_region: string
 *                 intermediate_region: string
 *     responses:
 *       '200':
 *         description: Address updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 zip:
 *                   type: string
 *                 street:
 *                   type: string
 *                 number:
 *                   type: string
 *                 complement:
 *                   type: string
 *                 district:
 *                   type: string
 *                 city:
 *                   type: string
 *                 state:
 *                   type: string
 *                 immediate_region:
 *                   type: string
 *                 intermediate_region:
 *                   type: string
 * 
 *               example:
 *                 zip: string
 *                 street: string
 *                 number: "126"
 *                 complement: string
 *                 district: string
 *                 city: string
 *                 state: string
 *                 immediate_region: string
 *                 intermediate_region: string
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 *       '400':
 *         description: Bad Request.
 *       '403':
 *         description: Forbidden.
 */

/**
 * @swagger
 * /address/{address_id}:
 *   delete:
 *     x-order: 5
 *     summary: Delete an address (No one is allowed to delete address).
 *     tags:
 *       - Address
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: address_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the address to delete.
 *     responses:
 *       '204':
 *         description: Address deleted successfully.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */