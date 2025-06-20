FROM node:18-alpine

# Métadonnées
LABEL maintainer="Di-Analyse Signal <contact@dianalyse-signal.com>"
LABEL description="Backend Industrial Management System"

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=3001

# Installer dépendances système
RUN apk add --no-cache \
    curl \
    tini

# Créer utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production && \
    npm cache clean --force

# Copier le code source
COPY . .

# Changer propriétaire
RUN chown -R nodejs:nodejs /app
USER nodejs

# Exposer le port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Point d'entrée
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"]
