# MSG

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## 1. Setup .env

- create **development.env** file of the server directory

```.env
MAILER_USER=
MAILER_HOST=
MAILER_PORT=
MAILER_PASS=

SERVER_HOST=
SERVER_APP_PORT=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALL_BACK_URL=
GOOGLE_AUTHENTICATOR_APP_NAME=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALL_BACK_URL=

CLIENT_ORIGIN=
CLIENT_TO_LOGIN=
CLIENT_TO_REGISTRATE=
CLIENT_TO_PROFILE=

REDIS_HOST=
REDIS_LOCAL_PORT=
REDIS_TTl=
REDIS_MAX=

SALT_OR_ROUNDS=

DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_PUBLIC_BUCKET_NAME=
```

- create **.env** file of the client directory

```.env
NEXT_PUBLIC_SECURE_LOCAL_STORAGE_HASH_KEY=
NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX=
NEST_PUBLIC_SERVER_BASE=
NEST_PUBLIC_SERVER_BASIC_SIGNUP=
SERVER_BASIC_SIGNUP_CONFIRM=
NEST_PUBLIC_SERVER_BASIC_SIGNUP_CONFIRM=
SERVER_BASIC_SIGNUP_RESEND=
NEST_PUBLIC_SERVER_BASIC_SIGNUP_RESEND=
NEST_PUBLIC_SERVER_BASIC_SIGNIN=
NEST_PUBLIC_SERVER_GOOGLE_SIGNIN=
NEST_PUBLIC_SERVER_GITHUB_SIGNIN=
NEST_PUBLIC_SERVER_QR=
NEST_PUBLIC_SERVER_TWO_FA_ON=
NEST_PUBLIC_SERVER_PROFILE=
NEST_PUBLIC_SERVER_UPLOAD_AVATAR=
NEXT_PUBLIC_CLIENT_REG=
NEXT_PUBLIC_CLIENT_CONFIRMATION=
NEXT_PUBLIC_CLIENT_PROFILE=
NEXT_PUBLIC_CLIENT_TWOFA=
NEST_PUBLIC_SERVER_REFRESH=
```

## 2. Up with docker-compose

#### Pull images and up containers

```sh
docker-compose --env-file ./server/development.env ./client/.env up --build
```

## 3. Server tree

```sh
src
├── app.module.ts
├── login
│   ├── signin
│   │   ├── dto
│   │   │   ├── payload.dto.ts
│   │   │   ├── signin.tokens.dto.ts
│   │   │   ├── signin.user.dto.ts
│   │   │   └── two.factor.authentication.code.dto.ts
│   │   ├── guards
│   │   │   ├── github.auth.guard.ts
│   │   │   ├── google.oauth.guard.ts
│   │   │   ├── jwt.refresh.guard.ts
│   │   │   └── local.signin.guard.ts
│   │   ├── signin.controller.ts
│   │   ├── signin.module.ts
│   │   ├── signin.service.ts
│   │   └── strategies
│   │       ├── github.signin.strategy.ts
│   │       ├── google.signin.strategy.ts
│   │       ├── jwt.refresh.token.strategy.ts
│   │       ├── local.signin.strategy.ts
│   │       └── signin.strategy.ts
│   └── twofa
│       ├── dto
│       │   └── two.factor.authentication.code.dto.ts
│       ├── guards
│       │   └── jwt.twofa.guard.ts
│       ├── strategies
│       │   └── jwt.twofa.strategy.ts
│       ├── twofa.controller.ts
│       ├── twofa.module.ts
│       └── twofa.service.ts
├── main.ts
├── profile
│   ├── dto
│   │   ├── avatar.dto.ts
│   │   └── user.profile.dto.ts
│   ├── guards
│   │   └── jwt.main.guard.ts
│   ├── pipes
│   │   ├── max.size.avatar.pipe.ts
│   │   └── type.avatar.pipe.ts
│   ├── profile.controller.ts
│   ├── profile.module.ts
│   ├── profile.service.ts
│   └── strategies
│       └── jwt.main.strategy.ts
├── signup
│   ├── dto
│   │   ├── create.user.dto.ts
│   │   ├── email.confirmation.dto.ts
│   │   ├── http.exception.dto.ts
│   │   └── resend.code.dto.ts
│   ├── guards
│   │   ├── confirmation.email.guard.ts
│   │   └── validate.new.user.guard.ts
│   ├── signup.controller.ts
│   ├── signup.module.ts
│   └── signup.service.ts
└── utils
    ├── mail
    │   ├── dto
    │   │   └── send.mail.dto.ts
    │   ├── mail.module.ts
    │   └── mail.service.ts
    ├── prisma
    │   ├── prisma.module.ts
    │   └── prisma.service.ts
    ├── redis
    │   ├── redis.module.ts
    │   └── redis.service.ts
    ├── repositories
    │   ├── avatar
    │   │   ├── avatar.module.ts
    │   │   └── avatar.service.ts
    │   └── user
    │       ├── user.module.ts
    │       └── user.service.ts
    └── s3
        ├── s3.module.ts
        └── s3.service.ts
```

## 4. Client tree

```sh
app/
├── 2fa
│   ├── components
│   │   └── err.tsx
│   ├── page.tsx
│   └── utils
│       ├── interfaces
│       │   └── 2fa.interfaces.ts
│       └── services
│           └── 2fa.services.ts
├── axios
│   └── axios.setup.ts
├── components
│   └── form
│       └── signin.form.tsx
├── favicon.ico
├── global.css
├── layout.tsx
├── not-found.tsx
├── page.tsx
├── profile
│   ├── page.tsx
│   └── utils
│       ├── interfaces
│       │   └── profile.interfaces.ts
│       └── services
│           └── profile.services.ts
├── registration
│   ├── components
│   │   └── form
│   │       └── signup.form.tsx
│   ├── confirmation
│   │   ├── components
│   │   │   └── form
│   │   │       └── email.confirmation.form.tsx
│   │   ├── page.tsx
│   │   └── utils
│   │       ├── interfaces
│   │       │   └── email.confirmation.interfaces.ts
│   │       └── services
│   │           └── email.confirmation.services.ts
│   ├── page.tsx
│   └── utils
│       ├── interfaces
│       │   └── signup.interfaces.ts
│       └── services
│           └── signup.services.ts
└── utils
    ├── interfaces
    │   └── signin.interfaces.ts
    └── services
        └── signin.services.ts
```

## 5. Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## 6. Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## 7. License

Nest is [MIT licensed](LICENSE).
