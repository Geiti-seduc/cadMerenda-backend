const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'cadMerenda API Documentation',
      description: 'Documentation from products API',
      version: '1.0.0',
    },
    tags: [
      {
        name: 'Default',
        description: 'Endpoints related to user Default',
      },
      {
        name: 'Address',
        description: 'Endpoints related to addresses',
      },
      {
        name: 'Certificate',
        description: 'Endpoints related to Certificates',
      },
      {
        name: 'Cycle',
        description: 'Endpoints related to cycles',
      },
      {
        name: 'Food',
        description: 'Endpoints related to foods',
      },
      {
        name: 'Gee',
        description: 'Endpoints related to GEEs',
      },
      {
        name: 'General List Food',
        description: 'Endpoints related to General Lists Foods',
      },
      {
        name: 'General Lists',
        description: 'Endpoints related to General Lists',
      },
      {
        name: 'Modality',
        description: 'Endpoints related to General Modalitys',
      },
      {
        name: 'Offered Products',
        description: 'Endpoints related to General Offered Products',
      },
      {
        name: 'Offer',
        description: 'Endpoints related to General Offers',
      },
      {
        name: 'Order',
        description: 'Endpoints related to General Orders',
      },
      {
        name: 'Requested Products',
        description: 'Endpoints related to Requested Products',
      },
      {
        name: 'Required Certificates',
        description: 'Endpoints related to Required Certificates',
      },
      {
        name: 'School Modality',
        description: 'Endpoints related to RSchool Modality',
      },
      {
        name: 'School User',
        description: 'Endpoints related to School User',
      },
      {
        name: 'School manager`s last access',
        description: 'Endpoints related to Ultimo acesso do gestor da escola',
      },
      {
        name: 'school And Supplier',
        description: 'Endpoints related to schoolAndSupplierRouter',
      },
      {
        name: 'school Offer',
        description: 'Endpoints related to schoolOfferRouter',
      },
      {
        name: 'School',
        description: 'Endpoints related to ',
      },
      {
        name: 'Register new supplier',
        description: 'Endpoints related to registering a new supplier user.',
      },
      {
        name: 'Supplier',
        description: 'Endpoints related to Suppliers',
      },
      {
        name: 'User and school',
        description: 'Endpoints related to user-and-school',
      },
      {
        name: 'User',
        description: 'Endpoints related to Users',
      },
      
    ],
  },
  apis: [
    './src/api/swagger/*.js',
  ],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
