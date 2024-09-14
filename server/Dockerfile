FROM node:22.2.0-alpine3.20 As development

WORKDIR /usr/src/app

COPY --chown=node:node package.json tsconfig.json prisma ./

RUN npm i

COPY --chown=node:node . .

USER node

####################

FROM node:22.2.0-alpine3.20 As build

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm i --only=production && npm cache clean --force

USER node

####################

FROM node:22.2.0-alpine3.20 As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules

COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "npm", "run", "start:prod" ]
