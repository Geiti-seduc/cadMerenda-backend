/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID of the order.
 *         school_inep:
 *           type: string
 *           description: School INEP associated with the order.
 *         cycle_id:
 *           type: string
 *           description: cycleId associated with the order.
 *         general_list_id:
 *           type: string
 *           description: generalListId associated with the order.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Record creation date and time.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time of last record update.
 */

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all orders
 *     tags:
 *       - Order
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
 *                 $ref: '#/components/schemas/Order'
 *               example:
 *                 - id: "601"
 *                   school_inep: "27036782"
 *                   createdAt: "2024-01-10T16:13:31.972Z"
 *                   updatedAt: "2024-01-10T16:13:31.972Z"
 *                   general_list_id: "701"
 *                   cycle_id: "48624"
 *                 - id: "602"
 *                   school_inep: "27036960"
 *                   createdAt: "2024-01-10T16:13:31.972Z"
 *                   updatedAt: "2024-01-10T16:13:31.972Z"
 *                   general_list_id: "702"
 *                   cycle_id: "48624"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Get an order by ID.
 *     tags:
 *       - Order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to retrieve.
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
 *                 $ref: '#/components/schemas/Order'
 *               example:
 *                 id: "601"
 *                 school_inep: "27036782"
 *                 createdAt: "2024-01-10T16:13:31.972Z"
 *                 updatedAt: "2024-01-10T16:13:31.972Z"
 *                 general_list_id: "701"
 *                 cycle_id: "48624"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /order/school/{school_inep}:
 *   get:
 *     summary: Get orders by school INEP.
 *     tags:
 *       - Order
 *     parameters:
 *       - in: path
 *         name: school_inep
 *         required: true
 *         schema:
 *           type: string  # Alterado de 'array' para 'string'
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
 *                 $ref: '#/components/schemas/Order'
 *               example:
 *                 - id: "603"
 *                   school_inep: "27036731"
 *                   createdAt: "2024-01-10T16:13:31.972Z"
 *                   updatedAt: "2024-01-10T16:13:31.972Z"
 *                   general_list_id: "703"
 *                   cycle_id: "48624"
 *                   requested_products:
 *                     - id: "2007"
 *                       quantity: 1
 *                       frequency: "Diária"
 *                       order_id: "603"
 *                       food_id: "301"
 *                       createdAt: "2024-01-10T16:13:32.153Z"
 *                       updatedAt: "2024-01-10T16:13:32.153Z"
 *                       food:
 *                         id: "301"
 *                         name: "Açúcar"
 *                         description: "refinado"
 *                         measure: "KG"
 *                         category: "Açúcar e doces"
 *                         nmc: 12345678
 *                         createdAt: "2024-01-10T16:13:31.686Z"
 *                         updatedAt: "2024-01-10T16:13:31.686Z"
 *                     - id: "2008"
 *                       quantity: 2
 *                       frequency: "Quinzenal"
 *                       order_id: "603"
 *                       food_id: "302"
 *                       createdAt: "2024-01-10T16:13:32.155Z"
 *                       updatedAt: "2024-01-10T16:13:32.155Z"
 *                       food:
 *                         id: "302"
 *                         name: "Sal"
 *                         description: "refinado"
 *                         measure: "KG"
 *                         category: "Sal e condimentos"
 *                         nmc: 12345679
 *                         createdAt: "2024-01-10T16:13:31.686Z"
 *                         updatedAt: "2024-01-10T16:13:31.686Z"
 *                     - id: "2009"
 *                       quantity: 4
 *                       frequency: "Semanal"
 *                       order_id: "603"
 *                       food_id: "303"
 *                       createdAt: "2024-01-10T16:13:32.153Z"
 *                       updatedAt: "2024-01-10T16:13:32.153Z"
 *                       food:
 *                         id: "303"
 *                         name: "Óleo"
 *                         description: "de soja"
 *                         measure: "LT"
 *                         category: "Óleos e gorduras"
 *                         nmc: 12345610
 *                         createdAt: "2024-01-10T16:13:31.686Z"
 *                         updatedAt: "2024-01-10T16:13:31.686Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /order/school/{school_inep}/{cycle_id}:
 *   get:
 *     summary: Get orders by school INEP and cycle ID.
 *     tags:
 *       - Order
 *     parameters:
 *       - in: path
 *         name: school_inep
 *         required: true
 *         schema:
 *           type: string
 *         description: School INEP to filter orders.
 *       - in: path
 *         name: cycle_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cycle ID to filter orders.
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
 *                 $ref: '#/components/schemas/Order'
 *               example:
 *                 - id: "603"
 *                   school_inep: "27036731"
 *                   createdAt: "2024-01-10T16:13:31.972Z"
 *                   updatedAt: "2024-01-10T16:13:31.972Z"
 *                   general_list_id: "703"
 *                   cycle_id: "48624"
 *                   general_list:
 *                     id: "703"
 *                     cycle_id: "48624"
 *                     description: "A lista do terceiro trimestre é focada no bulking dos alunos que querem ficar monstros! Birllll!"
 *                     modality_id: "903"
 *                     createdAt: "2024-01-10T16:13:31.865Z"
 *                     updatedAt: "2024-01-10T16:13:31.865Z"
 *                     modality:
 *                       id: "903"
 *                       name: "Educação Indígena e Quilombola - Tempo Parcial"
 *                       description: "O ensino integral envolve dias escolares mais longos, com atividades acadêmicas e extracurriculares integradas."
 *                       createdAt: "2024-01-10T16:13:31.808Z"
 *                       updatedAt: "2024-01-10T16:13:31.808Z"
 *                   requested_products:
 *                     - id: "2007"
 *                       quantity: 1
 *                       frequency: "Diária"
 *                       order_id: "603"
 *                       food_id: "301"
 *                       createdAt: "2024-01-10T16:13:32.153Z"
 *                       updatedAt: "2024-01-10T16:13:32.153Z"
 *                       food:
 *                         id: "301"
 *                         name: "Açúcar"
 *                         description: "refinado"
 *                         measure: "KG"
 *                         category: "Açúcar e doces"
 *                         nmc: 12345678
 *                         createdAt: "2024-01-10T16:13:31.686Z"
 *                         updatedAt: "2024-01-10T16:13:31.686Z"
 *                     - id: "2008"
 *                       quantity: 2
 *                       frequency: "Quinzenal"
 *                       order_id: "603"
 *                       food_id: "302"
 *                       createdAt: "2024-01-10T16:13:32.155Z"
 *                       updatedAt: "2024-01-10T16:13:32.155Z"
 *                       food:
 *                         id: "302"
 *                         name: "Sal"
 *                         description: "refinado"
 *                         measure: "KG"
 *                         category: "Sal e condimentos"
 *                         nmc: 12345679
 *                         createdAt: "2024-01-10T16:13:31.686Z"
 *                         updatedAt: "2024-01-10T16:13:31.686Z"
 *                     - id: "2009"
 *                       quantity: 4
 *                       frequency: "Semanal"
 *                       order_id: "603"
 *                       food_id: "303"
 *                       createdAt: "2024-01-10T16:13:32.153Z"
 *                       updatedAt: "2024-01-10T16:13:32.153Z"
 *                       food:
 *                         id: "303"
 *                         name: "Óleo"
 *                         description: "de soja"
 *                         measure: "LT"
 *                         category: "Óleos e gorduras"
 *                         nmc: 12345610
 *                         createdAt: "2024-01-10T16:13:31.686Z"
 *                         updatedAt: "2024-01-10T16:13:31.686Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /order/school/{school_inep}/{cycle_id}/total:
 *   get:
 *     summary: Get total count of orders by school INEP and cycle ID.
 *     tags:
 *       - Order
 *     parameters:
 *       - in: path
 *         name: school_inep
 *         required: true
 *         schema:
 *           type: string
 *         description: School INEP to filter orders.
 *       - in: path
 *         name: cycle_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cycle ID to filter orders.
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
 *                 $ref: '#/components/schemas/Order'
 *               example:
 *                 - food_id: "301"
 *                   nmc: 12345678
 *                   quantity: 1
 *                   frequency: "Diária"
 *                   name: "Açúcar"
 *                   description: "refinado"
 *                   measure: "KG"
 *                   category: "Açúcar e doces"
 *                 - food_id: "302"
 *                   nmc: 12345679
 *                   quantity: 2
 *                   frequency: "Quinzenal"
 *                   name: "Sal"
 *                   description: "refinado"
 *                   measure: "KG"
 *                   category: "Sal e condimentos"
 *                 - food_id: "303"
 *                   nmc: 12345610
 *                   quantity: 4
 *                   frequency: "Semanal"
 *                   name: "Óleo"
 *                   description: "de soja"
 *                   measure: "LT"
 *                   category: "Óleos e gorduras"
 *             totalOrdersIds:
 *               type: array
 *               items:
 *                 type: string
 *               example:
 *                 - "603"
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /order/school/{school_inep}/cycle/{cycle_id}:
 *   get:
 *     summary: Get orders by school INEP and cycle ID.
 *     tags:
 *       - Order
 *     parameters:
 *       - in: path
 *         name: school_inep
 *         required: true
 *         schema:
 *           type: string
 *         description: School INEP to filter orders.
 *       - in: path
 *         name: cycle_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cycle ID to filter orders.
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
 *                 $ref: '#/components/schemas/Order'
 *             example:
 *               - id: "603"
 *                 school_inep: "27036731"
 *                 createdAt: "2024-01-10T16:13:31.972Z"
 *                 updatedAt: "2024-01-10T16:13:31.972Z"
 *                 general_list_id: "703"
 *                 cycle_id: "48624"
 *                 general_list:
 *                   id: "703"
 *                   cycle_id: "48624"
 *                   description: "A lista do terceiro trimestre é focada no bulking dos alunos que querem ficar monstros! Birllll!"
 *                   modality_id: "903"
 *                   createdAt: "2024-01-10T16:13:31.865Z"
 *                   updatedAt: "2024-01-10T16:13:31.865Z"
 *                   modality:
 *                     id: "903"
 *                     name: "Educação Indígena e Quilombola - Tempo Parcial"
 *                     description: "O ensino integral envolve dias escolares mais longos, com atividades acadêmicas e extracurriculares integradas."
 *                     createdAt: "2024-01-10T16:13:31.808Z"
 *                     updatedAt: "2024-01-10T16:13:31.808Z"
 *                 requested_products:
 *                   - id: "2007"
 *                     quantity: 1
 *                     frequency: "Diária"
 *                     order_id: "603"
 *                     food_id: "301"
 *                     createdAt: "2024-01-10T16:13:32.153Z"
 *                     updatedAt: "2024-01-10T16:13:32.153Z"
 *                     food:
 *                       id: "301"
 *                       name: "Açúcar"
 *                       description: "refinado"
 *                       measure: "KG"
 *                       category: "Açúcar e doces"
 *                       nmc: 12345678
 *                       createdAt: "2024-01-10T16:13:31.686Z"
 *                       updatedAt: "2024-01-10T16:13:31.686Z"
 *                   - id: "2008"
 *                     quantity: 2
 *                     frequency: "Quinzenal"
 *                     order_id: "603"
 *                     food_id: "302"
 *                     createdAt: "2024-01-10T16:13:32.155Z"
 *                     updatedAt: "2024-01-10T16:13:32.155Z"
 *                     food:
 *                       id: "302"
 *                       name: "Sal"
 *                       description: "refinado"
 *                       measure: "KG"
 *                       category: "Sal e condimentos"
 *                       nmc: 12345679
 *                       createdAt: "2024-01-10T16:13:31.686Z"
 *                       updatedAt: "2024-01-10T16:13:31.686Z"
 *                   - id: "2009"
 *                     quantity: 4
 *                     frequency: "Semanal"
 *                     order_id: "603"
 *                     food_id: "303"
 *                     createdAt: "2024-01-10T16:13:32.153Z"
 *                     updatedAt: "2024-01-10T16:13:32.153Z"
 *                     food:
 *                       id: "303"
 *                       name: "Óleo"
 *                       description: "de soja"
 *                       measure: "LT"
 *                       category: "Óleos e gorduras"
 *                       nmc: 12345610
 *                       createdAt: "2024-01-10T16:13:31.686Z"
 *                       updatedAt: "2024-01-10T16:13:31.686Z"
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /order/create:
 *   post:
 *     summary: Create a new order.
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Order'
 *             example:
 *               school_inep: "27036782"
 *               cycle_id: "48624"
 *               general_list_id: "701"
 *               modality_id: "901"
 *               modality_name: "Educação Básica - Teste"
 *               requested_products:
 *                 - food_id: "301"
 *                   nmc: 15003503
 *                   frequency: "mensal"
 *                   quantity: 10
 *                   name: "Pão francês"
 *                   measure: "KG"
 *                   category: "Massas"
 *                   description: "Comum sem restrição"
 *                 - food_id: "302"
 *                   nmc: 15003504
 *                   frequency: "mensal"
 *                   quantity: 10
 *                   name: "Pão seda"
 *                   measure: "KG"
 *                   category: "Massas"
 *                   description: "Comum sem restrição"
 *                 - food_id: "303"
 *                   nmc: 15003505
 *                   frequency: "mensal"
 *                   quantity: 10
 *                   name: "Pão de hamburguer"
 *                   measure: "KG"
 *                   category: "Massas"
 *                   description: "Comum sem restrição"
 *     responses:
 *       '201':
 *         description: Order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /order/{id}:
 *   put:
 *     summary: Update an existing order.
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Order'
 *             example:
 *               school_inep: "27036782"
 *               cycle_id: "48624"
 *               general_list_id: "701"
 *               modality_id: "901"
 *               modality_name: "Educação Básica - Teste"
 *               requested_products:
 *                 - food_id: "301"
 *                   nmc: 15003503
 *                   frequency: "mensal"
 *                   quantity: 10
 *                   name: "Pão francês"
 *                   measure: "KG"
 *                   category: "Massas"
 *                   description: "Comum sem restrição"
 *                 - food_id: "302"
 *                   nmc: 15003504
 *                   frequency: "mensal"
 *                   quantity: 10
 *                   name: "Pão seda"
 *                   measure: "KG"
 *                   category: "Massas"
 *                   description: "Comum sem restrição"
 *                 - food_id: "303"
 *                   nmc: 15003505
 *                   frequency: "mensal"
 *                   quantity: 10
 *                   name: "Pão de hamburguer"
 *                   measure: "KG"
 *                   category: "Massas"
 *                   description: "Comum sem restrição"
 *     responses:
 *       '200':
 *         description: Order updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Delete an order.
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to delete.
 *     responses:
 *       '204':
 *         description: Order deleted successfully.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal Server Error.
 */
