# Cypress Testing

This repo shows how to test React app that makes API call to [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users) and then render list on Users page.
That API call is mocked in spec at `cypress/e2e/spec.cy.ts`

## Install and run develepment

```sh
yarn
yarn start
```

open app on [http://localhost:3000](http://localhost:3000)

## Build and serve prod bundle for Cypress testing

locally
```sh
yarn build
npx serve -s build -l 8000
```

in Docker
```sh
docker build -t nikolabod/react-cypress:latest .
docker run -d --name react-cypress -p 8000:8000 nikolabod/react-cypress:latest
```
open prod version with Cypress on [http://localhost:8000](http://localhost:8000)

## Spec Testing

make sure that React is running on port 8000 and then start cypress testing
```sh
npx cypress open
```

or in headless browser
```sh
npx cypress run --headless
```

You can change baseUrl in `cypress.config.ts`. Mock data that replace JSON from API are in `cypress/fixtures/users.json` 

### Build image for deployment

```sh
docker build -f Dockerfile.nginx -t nikolabod/react-nginx:latest .
docker push nikolabod/react-nginx:latest
docker run -d --name react-nginx -p 80:80 nikolabod/react-nginx:latest
docker push nikolabod/react-nginx:latest
```
open pure prod version without Cypress on [http://localhost](http://localhost)