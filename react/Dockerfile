FROM node:alpine AS builder

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn run build

FROM node:alpine

COPY --from=builder /app/build /app/build

WORKDIR /app

RUN yarn global add serve

EXPOSE 5000

CMD ["serve", "-s", "build", "-l", "5000"]

