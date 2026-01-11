FROM node:18-alpine

WORKDIR /app

# Force cache bust: 2026-01-11-v2
ARG CACHE_BUST=1

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy ALL source files (ensure fresh build)
COPY . .

# Clear any cached build output and rebuild
RUN rm -rf dist && npm run build

# Remove devDependencies to reduce image size
RUN npm prune --production

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start server
CMD ["node", "server.js"]
