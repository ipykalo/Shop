FROM node:alpine
WORKDIR /usr/app/src
COPY package*.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "dev"]