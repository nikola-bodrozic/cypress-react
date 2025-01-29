FROM cypress/base:20.13.0
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN npx cypress install
