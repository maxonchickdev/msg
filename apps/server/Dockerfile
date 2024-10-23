FROM node:23-slim AS dependencies

WORKDIR /home/app

COPY package.json ./

RUN yarn


FROM node:23-slim AS builder

WORKDIR /home/app

COPY --from=dependencies /home/app/node_modules ./node_modules

COPY . .

RUN yarn run server:build
