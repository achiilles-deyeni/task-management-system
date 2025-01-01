# syntax = docker/dockerfile:1
ARG NODE_VERSION: 20.18.0

FROM node:${20.18.0}-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm i -g nodemon

RUN npm ci

COPY . .

CMD npm run dev

EXPOSE 3000