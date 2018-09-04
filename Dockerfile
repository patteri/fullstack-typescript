FROM node:alpine

RUN mkdir -p /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Install app dependencies
WORKDIR /usr/src/app/server
RUN cd ../common && \
    npm install --production && \
    npm run build && \
    cd ../client && \
    npm install && \
    npm run build && \
    cd ../server && \
    npm install --production

ENV PORT 3001
ENV NODE_ENV production

EXPOSE $PORT

CMD [ "npm", "run", "start:prod" ]