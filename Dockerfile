FROM node:alpine AS builder

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn

RUN apk update && apk add --no-cache xvfb

COPY . .

RUN yarn run build

CMD ["npx","serve","-s","build","-l","8000"]

# FROM nginx:alpine

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=builder /app/dist /usr/share/nginx/html
 
# EXPOSE 8000

# CMD ["nginx", "-g", "daemon off;"]
