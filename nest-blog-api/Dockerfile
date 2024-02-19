FROM node:16-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . /app

RUN npm run build

CMD ["npm", "run", "start:dev"]
