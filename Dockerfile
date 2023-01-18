# Dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node api/prisma/ ./api/prisma/
RUN yarn
COPY --chown=node:node . .
