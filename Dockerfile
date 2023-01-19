# Dockerfile
FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node api/prisma/ ./api/prisma/
RUN  yarn
COPY --chown=node:node . .
RUN  yarn --cwd api build

USER node

FROM node:18-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node api/prisma ./api/prisma/
RUN  yarn

COPY --chown=node:node . .
COPY --chown=node:node --from=development /usr/src/app/dist .
CMD ["node", "dist/api"]
