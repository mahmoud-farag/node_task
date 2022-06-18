FROM node:16

WORKDIR /app

COPY package*.json ./

RUN  npm install

# RUN npm cli --only=production


COPY . .

EXPOSE 4000

CMD ["npm", "app.js"]