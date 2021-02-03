FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .
RUN mkdir uploads 



CMD ["npm", "start"]