FROM node:latest

WORKDIR /code

ENV NODE_ENV='development'
CMD yarn start
