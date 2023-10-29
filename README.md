<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



# Ejecutar en Desarrollo

### 1-Clone the Repository

### 2-Install dependencies
```
yarn install
```
### 3-Install Nest CLI(If you don't have it installed)
```
npm i -g @nestjs/cli
```
### 4-Up Database
```
docker-compose up -d
```
### 5-Clone the file ```.env.template``` and rename the copy ```.env```

### 6-Make file ```.env```
## .env example
```shell
# .env
MONGODB_URI=URI
PORT=PORT
```

### 7-Run the app in dev:
```
yarn start:dev
```
### 8-Open the DocumentBuilder ```http://localhost:3005/docs```

## 9-Test

```bash
# unit tests
$ yarn test dron.controller
$ yarn test medication.controller
```

# Stack Used
* MongoDB
* Nest JS

# Contact Me

- Author - [Leonard Gonzalez](https://portafolio-lyart-theta.vercel.app/)
- Website - [Portafolio Online](https://portafolio-lyart-theta.vercel.app/)
- Linkedin - [Profile](https://www.linkedin.com/in/leonardo-gonzalez-gonzalez-256127270/)

# Licencia

Nest is [MIT licensed](LICENSE).
