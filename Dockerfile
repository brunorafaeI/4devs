FROM node:lts-alpine

WORKDIR /app

EXPOSE 8080

RUN npm config set strict-ssl false \
    && yarn config set strict-ssl false \
    && yarn global add pm2 \
    && yarn global add typescript