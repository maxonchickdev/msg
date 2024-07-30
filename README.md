# UAS using JWT, Passport.js and Nest.js with TypeORM (MySQL)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## 1. Setup .env

- create **.env** file of the server directory
```.env
MAILER_USER=                test@gmail.com
MAILER_HOST=                smtp.gmail.com
MAILER_PORT=                465
MAILER_PASS=                1111 2222 3333 4444

MYSQL_HOST=                 localhost
MYSQL_LOCAL_PORT=           3306
MYSQL_USER=                 root
MYSQL_PASSWORD=             password
MYSQL_DATABASE=             database

MYSQL_ROOT_PASSWORD=        root
MYSQL_DOCKER_PORT=          3306

NESTJS_APP_LOCAL_PORT=      8080
NESTJS_APP_DOCKER_PORT=     8080

GOOGLE_CLIENT_ID=           client_id
GOOGLE_CLIENT_SECRET=       client_secret
GOOGLE_CALL_BACK_URL=       http://localhost:8080/auth/google-redirect

CLIENT_ORIGIN=              http://localhost:3000/
CLIENT_TO_LOGIN=            /
CLIENT_TO_REGISTRATE=       registrate
CLIENT_TO_PROFILE=          profile
```

- create **.env** file of the server directory
```.env
NEXTJS_APP_LOCAL_PORT=                              3000
NEXTJS_APP_DOCKER_PORT=                             3000

NEXT_PUBLIC_SECURE_LOCAL_STORAGE_HASH_KEY=          SeCrEt
NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX=            PrEfIx
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
│   ├── auth.service.ts
│   ├── constants
│   │   └── constants.ts
│   ├── dto
│   │   ├── login.dto.ts
│   │   └── payload.dto.ts
│   ├── guards
│   │   ├── google-oauth.guard.ts
│   │   ├── jwt-auth.guard.ts
│   │   └── local-auth.guard.ts
│   └── strategies
│       ├── google.strategy.ts
│       ├── jwt.strategy.ts
│       └── local.strategy.ts
├── email-confirmation
│   ├── dto
│   │   └── email-confirmation.dto.ts
│   ├── email-confirmation.controller.ts
│   ├── email-confirmation.module.ts
│   ├── email-confirmation.service.ts
│   └── guards
│       └── confirmation-email.guard.ts
├── mail
│   ├── mail.module.ts
│   └── mail.service.ts
├── main.ts
├── profile
│   ├── dto
│   │   └── profile.dto.ts
│   ├── profile.controller.ts
│   └── profile.module.ts
├── registration
│   ├── dto
│   │   └── user.dto.ts
│   ├── guards
│   │   └── validate.new.user.guard.ts
│   ├── registration.controller.ts
│   ├── registration.module.ts
│   └── registration.service.ts
└── utils
    ├── config
    │   ├── mailer.ts
    │   └── typeorm.ts
    ├── decorators
    │   └── parse.request.decorator.ts
    ├── entities
    │   ├── user.entity.ts
    │   └── validation.code.entity.ts
    └── migrations
        └── 1722090787235-User.ts
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
