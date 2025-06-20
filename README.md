# 🏭 Industrial Management System

Backend API avec interface Swagger pour système de gestion industrielle multi-tenant.

## 🚀 Démarrage rapide

### Avec Docker (recommandé)

```bash
# Cloner le projet
git clone https://github.com/johsdarcy/industrial-management-system.git
cd industrial-management-system

# Démarrer les services
./deploy.sh start

# Accéder à l'API
open http://localhost:3001/api/docs
```

### Développement local

```bash
cd backend
npm install
npm start
```

## 🌐 Accès

- **API principale** : http://localhost:3001/api
- **Documentation Swagger** : http://localhost:3001/api/docs  
- **JSON Swagger** : http://localhost:3001/api/docs/swagger.json
- **Health Check** : http://localhost:3001/health

## 🔧 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion utilisateur

### Sites industriels  
- `GET /api/sites` - Liste des sites

### Module commercial
- `GET /api/commercial/projets` - Projets avec calculs ROI

## 🧪 Test rapide

```bash
# Test de connexion
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@dianalyse-signal.com","motDePasse":"test123"}'

# Test des sites
curl http://localhost:3001/api/sites
```

## 🐳 Déploiement Docker

### Commandes disponibles

```bash
./deploy.sh start    # Démarrer
./deploy.sh stop     # Arrêter  
./deploy.sh restart  # Redémarrer
./deploy.sh logs     # Voir les logs
./deploy.sh status   # État des services
./deploy.sh clean    # Nettoyage complet
```

### Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   Nginx :80     │────│  Backend :3001  │
│ Reverse Proxy   │    │   Express API   │
└─────────────────┘    └─────────────────┘
```

## 🛠️ Configuration

### Variables d'environnement

```bash
NODE_ENV=production
PORT=3001
CORS_ORIGIN=*
```

### Docker Compose

- **Backend** : Express.js + Swagger UI
- **Nginx** : Reverse proxy avec compression
- **Réseau** : Bridge network isolé
- **Health checks** : Monitoring automatique

## 📊 Fonctionnalités

- ✅ API REST complète
- ✅ Documentation Swagger interactive
- ✅ Authentification JWT (simulée)
- ✅ Module commercial avec ROI
- ✅ Gestion sites industriels
- ✅ Rate limiting
- ✅ CORS configuré
- ✅ Health checks
- ✅ Logs structurés
- ✅ Déploiement Docker

## 🔒 Sécurité

- Helmet.js pour headers sécurisés
- Rate limiting (100 req/15min)
- CORS configuré
- Utilisateur non-root dans Docker
- Health checks intégrés

## 📈 Monitoring

```bash
# Logs en temps réel
./deploy.sh logs

# État des conteneurs
./deploy.sh status

# Health check
curl http://localhost:3001/health
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Pull Request

## 📝 License

MIT License - voir [LICENSE](LICENSE)

## 📞 Support

- 📧 Email : contact@dianalyse-signal.com
- 🌐 Website : https://dianalyse-signal.com
- 📚 Documentation : http://localhost:3001/api/docs
