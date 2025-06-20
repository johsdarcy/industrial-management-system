#!/bin/bash

# 🚀 Script de déploiement Industrial Management System

set -e

case "$1" in
  "start"|"up")
    echo "🚀 Démarrage des services..."
    docker-compose up -d --build
    echo "✅ Services démarrés !"
    echo ""
    echo "🌐 Accès:"
    echo "  - API: http://localhost:3001/api"
    echo "  - Swagger: http://localhost:3001/api/docs"
    echo "  - Nginx: http://localhost (redirect vers Swagger)"
    ;;
  "stop"|"down")
    echo "🛑 Arrêt des services..."
    docker-compose down
    ;;
  "restart")
    echo "🔄 Redémarrage des services..."
    docker-compose down
    docker-compose up -d --build
    ;;
  "logs")
    docker-compose logs -f
    ;;
  "status")
    docker-compose ps
    ;;
  "clean")
    echo "🧹 Nettoyage complet..."
    docker-compose down -v --rmi all
    docker system prune -f
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|logs|status|clean}"
    echo ""
    echo "Commandes disponibles:"
    echo "  start   - Démarrer les services"
    echo "  stop    - Arrêter les services"
    echo "  restart - Redémarrer les services"
    echo "  logs    - Voir les logs en temps réel"
    echo "  status  - État des conteneurs"
    echo "  clean   - Nettoyage complet"
    ;;
esac
