FROM node:8
WORKDIR /src/app
COPY package*.json /app
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 3001