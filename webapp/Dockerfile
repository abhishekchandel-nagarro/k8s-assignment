FROM node:24-slim AS base

WORKDIR /app


COPY package*.json ./
RUN npm cache clean --force && npm ci --only=production
RUN rm -rf node_modules package-lock.json \
    && npm install --force

COPY . .
EXPOSE 3000
CMD ["node", "server.js"]