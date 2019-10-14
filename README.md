# Node.js and React application templete with TypeScript

This project implements a template containing:

- Node.js + Express + TypeScript backend
- React + TypeScript frontend
- PostgreSQL database + data migrations
- Common module containing shared types and validations
- Cypress end-to-end tests
- Docker (compose) scripts for running the project in development and production

## Running the project

Required software:

- Node.js
- yarn
- Docker

### Server

```
cd server
yarn
```

Start and initialize the database:

```
docker-compose up -d
yarn build
yarn migrate
yarn seed
```

Run the server:

```
yarn start
```

Nodemon Node.js server is started and runs on `localhost:3001`.

### Client

```
cd client
yarn
yarn start
```

Webpack development server is started and runs on `localhost:3000`.

## Production build

```
docker-compose up -d
```

Node.js server is started and runs on `localhost:3001`.

## Testing

### Server

Running integration and unit tests of the server:

```
cd server
yarn test
```

### Client

Running unit tests of the client:

```
cd client
yarn test
```

### End-to-end

Run the server and client as described in [Running the project](#running-the-project).

Open Cypress UI to run and inspect e2e tests:

```
cd cypress
yarn cypress:open
```

To just run the e2e tests:

```
yarn cypress:run
```
