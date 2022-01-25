FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000

ENV BACKENDURL simple-backend-service
ENV BACKENDPORT 11111

CMD [ "node", "main.js" ]