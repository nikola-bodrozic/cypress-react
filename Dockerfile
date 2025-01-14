FROM node:alpine AS builder

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn

RUN apk update && apk add --no-cache xvfb curl xvfb-run

COPY . .

RUN yarn run build

CMD ["npx","serve","-s","build","-l","8000"]
