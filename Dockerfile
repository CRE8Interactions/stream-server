FROM node:alpine
RUN apk add --no-cache ffmpeg

# set working directory

WORKDIR /app

COPY package*.json ./

RUN npm install

# add app
COPY . .

CMD ["npm", "run", "dev"]