FROM node:24-slim AS base

WORKDIR /app


COPY package*.json ./

# Set production environment
ENV NODE_ENV=production
RUN npm ci --omit=dev

COPY . .
EXPOSE 3000
CMD ["node", "server.js"]