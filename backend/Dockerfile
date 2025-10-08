FROM node:22.11.0
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm install
RUN npm install -g nodemon --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD ["npm","start"]