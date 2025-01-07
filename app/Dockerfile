# syntax = docker/dockerfile:1
ARG NODE_VERSION=20.18.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm i -g nodemon

RUN npm ci

COPY . .

CMD ["npm", "start"]

EXPOSE 3000
