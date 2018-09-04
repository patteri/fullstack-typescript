# Node.js and React application with TypeScript

Implements a template of Node.js backend and React frontend using TypeScript. Has a common shared module containing types and validations.

## Running the project

### Server

```
cd server
npm install
npm start
```

Node.js server is started and runs on `localhost:3001`.

### Client

```
cd client
npm install
npm start
```

Webpack development server is started and runs on `localhost:3000`.

## Production build

```
cd client
npm run build
cd ../server
npm run start:prod
```

### Using Docker

```
docker-compose up
```

Node.js server is started and runs on `localhost:3001`.