FROM node:lts-alpine

WORKDIR /usr/src/app

EXPOSE 8080

RUN yarn config set strict-ssl false \
    && yarn global add pm2 typescript