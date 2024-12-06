import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Node API with Swagger',
    version: '1.0.0',
    description: 'This is a simple API for user authentication and data handling.',
  },
  servers: [
    {
      url: 'http://localhost:3000', 
    },
  ],
};

// Options for the swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ['./routes/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwaggerDocs = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwaggerDocs;
