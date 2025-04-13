# Etapa 1: build
FROM node:lts AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: ejecución
FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm install --only=production

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]
