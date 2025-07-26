FROM node:22.11.0

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install 

COPY . .
COPY .env .env

EXPOSE 5000
CMD ["npm", "start"]