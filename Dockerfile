FROM node:alpine AS builder

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn run build

CMD ["npx","serve","-s","build","-l","8000"]
