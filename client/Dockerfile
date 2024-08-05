FROM node:18-alpine AS dependencies

RUN apk add --no-cache libc6-compat

WORKDIR /home/app

COPY package.json ./

RUN npm i

################################

FROM node:18-alpine AS builder

WORKDIR /home/app

COPY --from=dependencies /home/app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

ARG NODE_ENV

ENV NODE_ENV=”${NODE_ENV}”

RUN npm run build

################################

FROM node:18-alpine AS runner

WORKDIR /home/app

ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /home/app/dist/standalone ./standalone
COPY --from=builder /home/app/dist/static /home/app/standalone/dist/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "./standalone/server.js"]
