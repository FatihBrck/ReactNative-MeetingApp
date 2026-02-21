FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install -g nodemon \
 && npm install jsonwebtoken bcryptjs expo-server-sdk --save \
 && npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
