# Node.js and React application with TypeScript

Implements a template of Node.js backend and React frontend using TypeScript. Has a common shared module containing types and validations.

## Running the project

Required software:

- Node.js
- Yarn
- Optional: Docker

### Server

```
cd server
yarn
yarn start
```

Node.js server is started and runs on `localhost:3001`.

### Client

```
cd client
yarn
yarn start
```

Webpack development server is started and runs on `localhost:3000`.

## Production build

```
cd client
yarn build
cd ../server
yarn start:prod
```

### Using Docker

```
docker-compose up
```

Node.js server is started and runs on `localhost:3001`.