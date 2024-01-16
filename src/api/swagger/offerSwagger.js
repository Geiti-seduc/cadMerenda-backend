/**
 * @swagger
 * components:
 *   schemas:
 *     Offer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID of the offer.
 *         total_price:
 *           type: number
 *           description: Total price of the offer.
 *         supplier_id:
 *           type: string
 *           description: ID of the supplier associated with the offer.
 *         createdAt:
 *           type: string
 *           description: Creation timestamp.
 *         updatedAt:
 *           type: string
 *           description: Last update timestamp.
 *         cycle_id:
 *           type: string
 *           description: Cycle id.
 */

/**
 * @swagger
 * /offer:
 *   get:
 *     summary: Get all offers.
 *     tags:
 *       - Offer
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
 *                  $ref: '#/components/schemas/Offer'
 *               example:
 *                - id: "10"
 *                  total_price: 140.69
 *                  supplier_id: "1"
 *                  createdAt: 2024-01-04T15:48:22.184Z
 *                  updateAt: 2024-03-04T15:48:22.184Z
 *                  cycle_id: "00000"
 * 
 *                - id: "11"
 *                  total_price: 100.00
 *                  supplier_id: "1"
 *                  createdAt: 2024-01-05T15:48:22.184Z
 *                  updateAt: 2024-02-05T15:48:22.184Z
 *                  cycle_id: "00000"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /offer/{id}:
 *   get:
 *     summary: Get an offer by ID.
 *     tags:
 *       - Offer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the offer to retrieve.
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
 *                  $ref: '#/components/schemas/Offer'
 *               example:
 *                 total_price: 140.69
 *                 supplier_id: "1"
 *                 createdAt: 2024-01-04T15:48:22.184Z
 *                 updateAt: 2024-03-04T15:48:22.184Z
 *                 cycle_id: "00000"
 *                 offered_products:
 *                 - product_price: 13.15
 *                   food_id: 313
 *                   nmc: 12345678
 *                   quantity: 12
 *                   frequency: Mensal
 *                   brand: 3 corações
 *                   name: açúcar
 *                   measure: KG
 *                   category: Açúcar e doces
 *                   description: refinado
 * 
 *                 - product_price: 9
 *                   food_id: 200
 *                   nmc: 12345678
 *                   quantity: 8
 *                   frequency: Diário
 *                   brand: Tang
 *                   name: suco
 *                   measure: UN
 *                   category: Bebidas
 *                   description: em pó
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /offer/supplier/{id}/{cycleId}:
 *   get:
 *     summary: Get offers by supplier user id.
 *     tags:
 *       - Offer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID to retrieve offers.
 *       - in: path
 *         name: cycleId
 *         required: true
 *         schema:
 *           type: string
 *         description: cycleId to retrieve offers.
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
 *                  $ref: '#/components/schemas/Offer'
 *               example:
 *                 - id: 1234
 *                   total_price: 140.69
 *                   supplier_id: "1"
 *                   createdAt: 2024-01-04T15:48:22.184Z
 *                   updateAt: 2024-03-04T15:48:22.184Z
 *                   total_order:
 *                   - id: 105
 *                     order_id: 501
 *                     offer_id: 1100
 *                     createdAt: 2024-01-05T15:48:23.560Z
 *                     updateAt: 2024-01-05T15:48:23.560Z
 * 
 *                   - id: 104
 *                     order_id: 502
 *                     offer_id: 1110
 *                     createdAt: 2024-01-05T15:47:23.560Z
 *                     updateAt: 2024-01-05T15:48:23.560Z
 *                   school:
 *                     inep: "12345678"
 *                     name: Escola de Magia e Bruxaria de Hogwarts
 * 
 *                 - id: 1234
 *                   total_price: 140.69
 *                   supplier_id: "1"
 *                   createdAt: 2024-01-04T15:48:22.184Z
 *                   updateAt: 2024-03-04T15:48:22.184Z
 *                   total_order:
 *                   - id: 106
 *                     order_id: 401
 *                     offer_id: 1200
 *                     createdAt: 2024-01-05T15:48:23.560Z
 *                     updateAt: 2024-01-05T15:48:23.560Z
 * 
 *                   - id: 103
 *                     order_id: 402
 *                     offer_id: 1210
 *                     createdAt: 2024-01-05T15:47:23.560Z
 *                     updateAt: 2024-01-05T15:48:23.560Z
 *                   school:
 *                     inep: "12345678"
 *                     name: Escola do Governo de Alagoas
 *               
 *                  
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /offer/cycle/{cycle_id}/{supplier_id}:
 *   get:
 *     summary: Get offers by cycle and supplier ID.
 *     tags:
 *       - Offer
 *     parameters:
 *       - in: path
 *         name: cycle_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cycle ID to filter offers.
 *       - in: path
 *         name: supplier_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID to filter offers.
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
 *                  $ref: '#/components/schemas/Offer'
 *               example:
 *                 - id: "2000"
 *                   total_price: 130.67
 *                   createdAt: 2024-01-04T15:48:22.184Z
 *                   updateAt: 2024-03-04T15:48:22.184Z
 * 
 *                 - id: "2003"
 *                   total_price: 130.67
 *                   createdAt: 2024-01-04T15:48:22.184Z
 *                   updateAt: 2024-03-04T15:48:22.184Z
 * 
 *                 - id: "2005"
 *                   total_price: 130.67
 *                   createdAt: 2024-01-04T15:48:22.184Z
 *                   updateAt: 2024-03-04T15:48:22.184Z
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /offer/school/{school_inep}/{supplier_id}/{cycle_id}:
 *   get:
 *     summary: Get offers by school INEP, supplier ID, and cycle ID.
 *     tags:
 *       - Offer
 *     parameters:
 *       - in: path
 *         name: school_inep
 *         required: true
 *         schema:
 *           type: string
 *         description: School INEP to filter offers.
 *       - in: path
 *         name: supplier_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID to filter offers.
 *       - in: path
 *         name: cycle_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cycle ID to filter offers.
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
 *                  $ref: '#/components/schemas/Offer'
 *               example:
 *                 id: "1234"
 *                 total_price: 140.69
 *                 offered_products:
 *                 - product_price: 13.15
 *                   food_id: 313
 *                   nmc: 12345678
 *                   quantity: 12
 *                   frequency: Mensal
 *                   brand: 3 corações
 *                   name: açúcar
 *                   measure: KG
 *                   category: Açúcar e doces
 *                   description: refinado
 * 
 *                 - product_price: 9
 *                   food_id: 200
 *                   nmc: 12345678
 *                   quantity: 8
 *                   frequency: Diário
 *                   brand: Tang
 *                   name: suco
 *                   measure: UN
 *                   category: Bebidas
 *                   description: em pó
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /offer/create:
 *   post:
 *     summary: Create a new offer.
 *     tags:
 *       - Offer
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *                $ref: '#/components/schemas/Offer'
 *             example:
 *               total_price: 10.1
 *               supplier_id: "101"
 *               cycle_id: "48624"
 *               offered_products:
 *                 - product_price: 10.5
 *                   food_id: "301"
 *                   nmc: 12345678
 *                   quantity: 10
 *                   frequency: "Mensal"
 *                   brand: "fila"
 *                   name: "Açúcar"
 *                   measure: "KG"
 *                   category: "Açúcar e doces"
 *                   description: "refinado"
 *                 - product_price: 10.5
 *                   food_id: "302"
 *                   nmc: 12345679
 *                   quantity: 10
 *                   frequency: "Quinzenal"
 *                   brand: "Under Armour"
 *                   name: "Sal"
 *                   measure: "KG"
 *                   category: "Sal e condimentos"
 *                   description: "refinado"
 *                 - product_price: 10.5
 *                   food_id: "303"
 *                   nmc: 12345610
 *                   quantity: 1
 *                   frequency: "Semanal"
 *                   brand: "All Star"
 *                   name: "Óleo"
 *                   measure: "LT"
 *                   category: "Óleos e gorduras"
 *                   description: "de soja"
 *     responses:
 *       '201':
 *         description: Offer created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Offer'
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /offer/{id}:
 *   put:
 *     summary: Update an existing offer.
 *     tags:
 *       - Offer
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the offer to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Offer'
 *             example:
 *               total_price: 10.1
 *               supplier_id: "101"
 *               cycle_id: "48624"
 *               offered_products:
 *                 - product_price: 10.5
 *                   food_id: "301"
 *                   nmc: 12345678
 *                   quantity: 10
 *                   frequency: "Mensal"
 *                   brand: "fila"
 *                   name: "Açúcar"
 *                   measure: "KG"
 *                   category: "Açúcar e doces"
 *                   description: "refinado"
 *                 - product_price: 10.5
 *                   food_id: "302"
 *                   nmc: 12345679
 *                   quantity: 10
 *                   frequency: "Quinzenal"
 *                   brand: "Under Armour"
 *                   name: "Sal"
 *                   measure: "KG"
 *                   category: "Sal e condimentos"
 *                   description: "refinado"
 *                 - product_price: 10.5
 *                   food_id: "303"
 *                   nmc: 12345610
 *                   quantity: 1
 *                   frequency: "Semanal"
 *                   brand: "All Star"
 *                   name: "Óleo"
 *                   measure: "LT"
 *                   category: "Óleos e gorduras"
 *                   description: "de soja"
 *     responses:
 *       '200':
 *         description: Offer updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Offer'
 *               example:
 *                 total_price: 15.1
 *                 supplier_id: "101"
 *                 cycle_id: "48624"
 *                 offered_products:
 *                   - product_price: 10.5
 *                     food_id: "301"
 *                     nmc: 12345678
 *                     quantity: 10
 *                     frequency: "Mensal"
 *                     brand: "fila"
 *                     name: "Açúcar"
 *                     measure: "KG"
 *                     category: "Açúcar e doces"
 *                     description: "refinado"
 *                   - product_price: 10.5
 *                     food_id: "302"
 *                     nmc: 12345679
 *                     quantity: 10
 *                     frequency: "Quinzenal"
 *                     brand: "Under Armour"
 *                     name: "Sal"
 *                     measure: "KG"
 *                     category: "Sal e condimentos"
 *                     description: "refinado"
 *                   - product_price: 10.5
 *                     food_id: "303"
 *                     nmc: 12345610
 *                     quantity: 1
 *                     frequency: "Semanal"
 *                     brand: "All Star"
 *                     name: "Óleo"
 *                     measure: "LT"
 *                     category: "Óleos e gorduras"
 *                     description: "de soja"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /offer/{id}:
 *   delete:
 *     summary: Delete an offer (no one is allowed to delete).
 *     tags:
 *       - Offer
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the offer to delete.
 *     responses:
 *       '204':
 *         description: Offer deleted successfully.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /offer/school/{inep}/{cycle_id}:
 *   get:
 *     summary: Get offers by school INEP and cycle ID.
 *     tags:
 *       - Offer
 *     parameters:
 *       - in: path
 *         name: inep
 *         required: true
 *         schema:
 *           type: string
 *         description: INEP of the school.
 *       - in: path
 *         name: cycle_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cycle.
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
 *                 $ref: '#/components/schemas/Offer'
 *               example:
 *                 id: "1234"
 *                 total_price: 140.69
 *                 supplier_id: "123"
 *                 supplier: Padaria 2 Irmãos
 *                 offered_products:
 *                 - product_price: 13.15
 *                   food_id: 313
 *                   nmc: 12345678
 *                   quantity: 12
 *                   frequency: Mensal
 *                   brand: 3 corações
 *                   name: açúcar
 *                   measure: KG
 *                   category: Açúcar e doces
 *                   description: refinado
 * 
 *                 - product_price: 9
 *                   food_id: 200
 *                   nmc: 12345678
 *                   quantity: 8
 *                   frequency: Diário
 *                   brand: Tang
 *                   name: suco
 *                   measure: UN
 *                   category: Bebidas
 *                   description: em pó
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /offer/school/count/{inep}/{cycleId}/total:
 *   get:
 *     summary: Get total count of offers by school INEP and cycle ID.
 *     tags:
 *       - Offer
 *     parameters:
 *       - in: path
 *         name: inep
 *         required: true
 *         schema:
 *           type: string
 *         description: INEP of the school.
 *       - in: path
 *         name: cycleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cycle.
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
 *                 $ref: '#/components/schemas/Offer'
 *               example:
 *                 totalCount: 2
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /offer/supplier/{id}/schools/{cycleId}:
 *   get:
 *     summary: Get schools associated with a supplier's offer.
 *     tags:
 *       - Offer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the supplier.
 *       - in: path
 *         name: cycleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cycle.
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
 *                 $ref: '#/components/schemas/Offer'
 *               example:
 *                 - schoolInep: "1234567"
 *                   schoolName: Escola Estadual Tales de Mileto
 *                 - schoolInep: "1234789"
 *                   schoolName: Escola Municipal Tales de Mileto
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */
