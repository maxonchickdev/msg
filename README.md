# UAS using JWT, Passport.js and Nest.js with TypeORM (MySQL)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Up server localy

### Modify _.env_

```
DB_HOST=                    # localhost
DB_PORT=                    # 3306
DB_USERNAME=                # root
DB_PASSWORD=                # qwerty
DB_NAME=                    # <database_name>
```

### Database setup

- open mysql in terminal

```bash
/usr/local/mysql/bin/mysql -u root -p
```

```bash
create database <database_name>;
```

### Next steps

1. **Install dependencies**

```bash
pnpm i
```

2. **Run server in development mode**

```bash
pnpm run start:dev
```

**Check if server running** \
Open `http://localhost:3000/users/`

3. **Run production mode**

1. **Building prossess**

```bash
pnpm run build
```

2. **Run server in production mode**

```bash
pnpm run start:prod
```

**Check if server running** \
Open `http://localhost:3000/users/`

## Up with docker (method 1)

### Modify _docker-compose.yml_ file

- define **<root_password>** to real MySQL root user password
- define **<database_name>** to the same in file _app.module.ts_
- define **<port>** to the same as **DB_PORT** in _.env_ file

### Build docker image

```bash
docker build -t uas-image:0.0.1 .
```

### Run image in corresponding container

```bash
docker run -p 3000:3000 -t uas-image:0.0.1
```

## Up with docker (method 2)

```bash
git clone https://github.com/plinom/nest-reg-login.git
```

```bash
docker-compose up -d
```

**Check if server running** \
Open `http://localhost:3000/users/`

## Curls

1. **get all exists users**

```bash
curl -X GET http://localhost:3000/users -H 'Content-Type: application/json'
```

2. **create new user**

```bash
curl -X POST http://localhost:3000/users -H 'Content-Type: application/json' -d '{"username": "user1", "password": "111"}'
```

3. **update username of an existing user**

```bash
curl -X PUT http://localhost:3000/users/1 -H 'Content-Type: application/json' -d '{"username": "new_username"}'
```

4. **update password of an existing user**

```bash
curl -X PUT http://localhost:3000/users/1 -H 'Content-Type: application/json' -d '{"password": "new_password"}'
```

5. **update username and password of an existing user**

```bash
curl -X PUT http://localhost:3000/users/1 -H 'Content-Type: application/json' -d '{"username": "new_username", "password": "new_password"}'
```

6. **delete user by id**

```bash
curl -X DELETE http://localhost:3000/users/1 -H 'Content-Type: application/json'
```

7. **login**

```bash
curl -X POST http://localhost:3000/auth/login -d '{"username": "user_username", "password": "user_password"}' -H 'Content-Type: application/json'
```

8. **get profile**

```bash
curl -X GET http://localhost:8080/profile -H 'Content-Type: application/json' -H 'Authorization: Bearer <token>'
```

## Also you can using swagger documentation

![swagger docs](https://github.com/plinom/nest-reg-login/preview/swagger.jpg)

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
