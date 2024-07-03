# UAS using JWT, Passport.js and Nest.js with TypeORM (MySQL)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## 1. Setup .env

- create **.env** file in the root of the project
- define **MAILER_USER**, **MAILER_HOST**, **MAILER_PORT**, **MAILER_PASS** for send mails
- also create and define **MYSQLDB_HOST**, **MYSQLDB_LOCAL_PORT**, **MYSQLDB_USER**, **MYSQLDB_PASSWORD**, **MYSQLDB_DATABASE** vars for nestjs server
- **MYSQLDB_ROOT_PASSWORD**, **MYSQLDB_DOCKER_PORT**, **NESTJS_APP_LOCAL_PORT**, **NESTJS_APP_DOCKER_PORT** for ports mapping in docker

```
MAILER_USER=<your_mail>@gmail.com # define gmail
MAILER_HOST=smtp.gmail.com
MAILER_PORT=465
MAILER_PASS=1111 2222 3333 4444   # define application password

MYSQLDB_HOST=mysql-db
MYSQLDB_LOCAL_PORT=3306
MYSQLDB_USER=monty
MYSQLDB_PASSWORD=reg-log-app
MYSQLDB_DATABASE=users

MYSQLDB_ROOT_PASSWORD=root
MYSQLDB_DOCKER_PORT=3306

NESTJS_APP_LOCAL_PORT=8080
NESTJS_APP_DOCKER_PORT=8080
```

## 2. Up localy

#### Pull and run mysql-server [Click here](https://hub.docker.com/r/mysql/mysql-server/)
#### Change **MYSQLDB_HOST**, **MYSQLDB_USER**, **MYSQLDB_PASSWORD** in .env file
```
pnpm i
pnpm run start:dev
```

## 3. Up with docker-compose

#### Pull images and uo containers
```bash
docker-compose up
```

#### Show container logs
```bash
docker-compose logs mysql-db

docker-compose logs nestjs-app
```

#### Execute to container

```bash
docker-compose exec mysql-db bash

docker-compose exec nestjs-app bash
```

## 4. Tree

```bash
src
├── app.module.ts
├── auth
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── constants
│   │   └── constants.ts
│   ├── guards
│   │   ├── jwt-auth.guard.ts
│   │   └── local-auth.guard.ts
│   └── strategies
│       ├── jwt.strategy.ts
│       └── local.strategy.ts
├── classes
│   └── users.classes.ts
├── mail
│   ├── mail.controller.spec.ts
│   ├── mail.controller.ts
│   ├── mail.module.ts
│   ├── mail.service.spec.ts
│   └── mail.service.ts
├── main.ts
├── user
│   └── user.decorator.ts
└── users
    ├── user.entity.ts
    ├── users.controller.ts
    ├── users.module.ts
    └── users.service.ts
```

## 5. Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## 6. Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## 7. License

Nest is [MIT licensed](LICENSE).
