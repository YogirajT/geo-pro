FROM node:16-alpine as development

WORKDIR /app
ARG DOCKER_BACKEND_APP_PORT

COPY --chown=node:node tsconfig*.json ./
COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node src/ src/

RUN npm run build

USER node

EXPOSE $DOCKER_BACKEND_APP_PORT
