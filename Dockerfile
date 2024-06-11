FROM node:22.2.0

WORKDIR /app

COPY package.json .

RUN npm install -g pnpm
RUN pnpm i

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]
