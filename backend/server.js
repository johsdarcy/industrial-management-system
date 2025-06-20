import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration Swagger complète
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Industrial Management System API',
      version: '1.0.0',
      description: 'API fonctionnelle avec Swagger UI',
      contact: {
        name: 'API Support',
        email: 'support@industrial.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
        description: 'Serveur de développement'
      },
      {
        url: 'http://148.113.207.144:3001/api',
        description: 'Serveur de production'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./server.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middlewares
app.use(cors());
app.use(express.json());

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Point d'entrée de l'API
 *     description: Retourne les informations de base de l'API
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "🏭 Industrial Management System API"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 docs:
 *                   type: string
 *                   example: "/api/docs"
 */
app.get('/api', (req, res) => {
  res.json({
    message: '🏭 Industrial Management System API',
    version: '1.0.0',
    docs: '/api/docs',
    swagger: '/api/docs/swagger.json',
    status: 'operational',
    timestamp: new Date().toISOString()
  });
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     description: Authentifie un utilisateur et retourne un token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - motDePasse
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "test@dianalyse-signal.com"
 *               motDePasse:
 *                 type: string
 *                 example: "test123"
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIs..."
 *                 client:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Identifiants invalides
 */
app.post('/api/auth/login', (req, res) => {
  const { email, motDePasse } = req.body;
  
  if (email === 'test@dianalyse-signal.com' && motDePasse === 'test123') {
    res.json({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example',
      client: {
        id: 'client_123',
        email: email,
        nomSociete: 'SOCIETE TEST'
      }
    });
  } else {
    res.status(401).json({ error: 'Identifiants invalides' });
  }
});

/**
 * @swagger
 * /api/sites:
 *   get:
 *     summary: Liste des sites
 *     description: Retourne la liste des sites industriels
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des sites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   location:
 *                     type: string
 */
app.get('/api/sites', (req, res) => {
  res.json([
    {
      id: 'site_1',
      name: 'Site de production Roanne',
      location: 'Roanne, France',
      status: 'active'
    },
    {
      id: 'site_2', 
      name: 'Site logistique Lyon',
      location: 'Lyon, France',
      status: 'active'
    }
  ]);
});

// Configuration Swagger UI avec options complètes
const swaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true
  },
  customCss: `
    .swagger-ui .topbar { 
      background-color: #2c3e50; 
    }
    .swagger-ui .info .title {
      color: #2c3e50;
    }
  `,
  customSiteTitle: 'Industrial Management API',
  customfavIcon: '/favicon.ico'
};

// Routes Swagger - ORDRE IMPORTANT
app.use('/api/docs', swaggerUi.serve);
app.get('/api/docs', swaggerUi.setup(swaggerSpec, swaggerUiOptions));

// Route pour le JSON Swagger - EXPLICITE
app.get('/api/docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(swaggerSpec);
});

// Route catch-all pour debug
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route non trouvée', 
    path: req.originalUrl,
    method: req.method,
    availableRoutes: [
      'GET /api',
      'POST /api/auth/login', 
      'GET /api/sites',
      'GET /api/docs',
      'GET /api/docs/swagger.json'
    ]
  });
});

// Démarrage du serveur
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('\n🏭 Backend Express + Swagger UI');
  console.log('================================');
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`🌐 API: http://localhost:${PORT}/api`);
  console.log(`📚 Swagger UI: http://localhost:${PORT}/api/docs`);
  console.log(`📄 Swagger JSON: http://localhost:${PORT}/api/docs/swagger.json`);
  console.log(`🌍 Accès externe: http://148.113.207.144:${PORT}/api/docs`);
  console.log('================================\n');
  
  // Test automatique après démarrage
  setTimeout(() => {
    import('./test.js');
  }, 2000);
});

export default app;
