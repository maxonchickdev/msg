# MESSANGER

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## 1. Setup .env

- create **.env** file of the server directory
```.env
MAILER_USER=
MAILER_HOST=
MAILER_PORT=
MAILER_PASS=

MYSQL_HOST=
MYSQL_LOCAL_PORT=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=

MYSQL_ROOT_PASSWORD=
MYSQL_DOCKER_PORT=

NESTJS_APP_LOCAL_PORT=
NESTJS_APP_DOCKER_PORT=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALL_BACK_URL=

CLIENT_ORIGIN=
CLIENT_TO_LOGIN=
CLIENT_TO_REGISTRATE=
CLIENT_TO_PROFILE=

REDIS_HOST=
REDIS_PORT=

```

- create **.env** file of the server directory
```.env
NEXTJS_APP_LOCAL_PORT=
NEXTJS_APP_DOCKER_PORT=

NEXT_PUBLIC_SECURE_LOCAL_STORAGE_HASH_KEY=
NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX=

NEST_PUBLIC_SERVER_BASE=
NEST_PUBLIC_CLIENT_ROOT=

NEST_PUBLIC_SERVER_BASIC_AUTH=
NEST_PUBLIC_SERVER_GOOGLE_AUTH=

NEST_PUBLIC_SERVER_BASIC_REG=
NEST_PUBLIC_SERVER_BASIC_REG_CONFIRM=

NEST_PUBLIC_SERVER_BASIC_PROFILE=
```

## 2. Up with docker-compose

#### Pull images and uo containers
```sh
docker-compose up
```

#### Check container logs
```sh
docker-compose logs mysql-db

docker-compose logs nestjs-app
```

#### Execute to container

```sh
docker-compose exec mysql-db bash

docker-compose exec nestjs-app bash
```

## 3. Server tree

```sh
src
├── app.module.ts
├── auth
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── email-confirmation
│   ├── email-confirmation.controller.ts
│   ├── email-confirmation.module.ts
│   └── email-confirmation.service.ts
├── mail
│   ├── mail.module.ts
│   └── mail.service.ts
├── main.ts
├── profile
│   ├── profile.controller.ts
│   ├── profile.module.ts
│   └── profile.service.ts
├── redis
│   ├── redis.module.ts
│   └── redis.service.ts
├── registration
│   ├── registration.controller.ts
│   ├── registration.module.ts
│   └── registration.service.ts
├── repositories
│   └── users
│       ├── users.module.ts
│       └── users.service.ts
└── utils
    ├── config
    │   ├── mailer.ts
    │   └── typeorm.ts
    ├── constants
    │   └── constants.ts
    ├── decorators
    │   └── parse-request.decorator.ts
    ├── dto
    │   ├── email-confirmation.dto.ts
    │   ├── login.dto.ts
    │   ├── mail.dto.ts
    │   ├── payload.dto.ts
    │   ├── profile.dto.ts
    │   └── user.dto.ts
    ├── entities
    │   └── user.entity.ts
    ├── guards
    │   ├── confirmation-email.guard.ts
    │   ├── google-oauth.guard.ts
    │   ├── jwt-auth.guard.ts
    │   ├── local-auth.guard.ts
    │   └── validate.new.user.guard.ts
    ├── migrations
    │   └── 1722589444444-User.ts
    └── strategies
        ├── google.strategy.ts
        ├── jwt.strategy.ts
        └── local.strategy.ts
```

## 4. Client tree
```sh
app
├── components
│   ├── custom
│   │   ├── button
│   │   │   └── button.tsx
│   │   ├── error
│   │   │   └── error.tsx
│   │   ├── link
│   │   │   └── link.tsx
│   │   └── snackbar
│   │       └── snackbar.tsx
│   └── forms
│       ├── login.form.tsx
│       ├── registration.form.tsx
│       └── validate.code.form.tsx
├── favicon.ico
├── global.css
├── layout.tsx
├── not-found.tsx
├── page.tsx
├── profile
│   └── page.tsx
├── registrate
│   └── page.tsx
└── utils
    ├── interfaces
    │   └── interfaces.ts
    └── services
        └── services.ts
```

## 5. Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## 6. Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## 7. License

Nest is [MIT licensed](LICENSE).
