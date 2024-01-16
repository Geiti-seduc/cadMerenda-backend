/**
 * @swagger
 * components:
 *   schemas:
 *     SchoolOffer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the offer.
 *         supplier:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: Unique identifier for the supplier.
 *             company_name:
 *               type: string
 *               description: Name of the supplier company.
 *             total_price:
 *               type: number
 *               format: float
 *               description: Total price of the offer.
 *         offered_products:
 *           type: array
 *           properties:
 *             product_price:
 *               type: number
 *               format: float
 *             brand:
 *               type: string
 *             quantity:
 *               type: integer
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             measure:
 *               type: string
 */

/**
 * @swagger
 * /school-offer:
 *   get:
 *     summary: Get all school's offer.
 *     tags:
 *       - school Offer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of school offers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SchoolOffer'
 *             example:
 *               - id: "1003"
 *                 supplier:
 *                   id: "101"
 *                   company_name: "Assaí Atacadista"
 *                 total_price: 18.3
 *       401:
 *         description: Unauthorized. Token not provided or invalid.
 *       403:
 *         description: Forbidden. User does not have the right permissions.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /school-offer/{supplierId}:
 *   get:
 *     summary: Get all school's offers for a specific supplier.
 *     tags:
 *       - school Offer
 *     parameters:
 *       - in: path
 *         name: supplierId
 *         required: true
 *         schema:
 *           type: string
 *         description: The supplier's unique identifier.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of school offers with detailed products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/SchoolOffer'
 *               example:
 *                 offers:
 *                 - id: "1001"
 *                   supplier_id: "101"
 *                   offered_products:
 *                     - product_price: 11.5
 *                       brand: "fila"
 *                       quantity: 100
 *                       id: "301"
 *                       name: "Açúcar"
 *                       description: "refinado"
 *                       measure: "KG"
 *                     - product_price: 2.5
 *                       brand: "Under Armour"
 *                       quantity: 10
 *                       id: "302"
 *                       name: "Sal"
 *                       description: "refinado"
 *                       measure: "KG"
 *                     - product_price: 1.5
 *                       brand: "All Star"
 *                       quantity: 1
 *                       id: "303"
 *                       name: "Óleo"
 *                       description: "de soja"
 *                       measure: "LT"
 *               totalProductPrice: 15.5
 *       401:
 *         description: Unauthorized. Token not provided or invalid.
 *       403:
 *         description: Forbidden. User does not have the right permissions.
 *       500:
 *         description: Internal Server Error.
 */
