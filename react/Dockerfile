FROM node:alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
RUN yarn global add serve
EXPOSE 5000
CMD ["serve", "-s", "build", "-l", "5000"]
