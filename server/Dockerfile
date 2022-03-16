FROM node:16-alpine

WORKDIR /usr/src/server

COPY ./ ./
COPY package*.json ./
RUN npm install

EXPOSE 80


CMD ["npm", "start"]