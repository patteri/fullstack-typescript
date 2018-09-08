FROM node:alpine

RUN mkdir -p /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Install app dependencies
WORKDIR /usr/src/app/server
RUN npm install -g yarn && \
    cd ../common && \
    yarn --production && \
    yarn build && \
    cd ../client && \
    yarn && \
    yarn build && \
    cd ../server && \
    yarn --production && \
    yarn build

ENV PORT 3001
ENV NODE_ENV production

EXPOSE $PORT

CMD [ "npm", "run", "start:prod" ]