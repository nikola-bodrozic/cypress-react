# Cypress Testing

This repo shows how to test React app that makes API call to [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users) and then render list on Users page - [http://localhost:3000/users](http://localhost:3000/users)

That API call is mocked in spec at `cypress/e2e/render-users.cy.ts` and corresponding JSON data are in `cypress/fixtures/users.json` this solution is CI/CD friendly since live API does not to be up. Only react app must be up for successful Cypress testing. You can set baseUrl in file `cypress.config.ts`

## Install and run in develepment

```sh
yarn
yarn start
```

open app on [http://localhost:3000](http://localhost:3000) and run
```sh
yarn run e2e # headless browser
```

or
```sh
npx cypress run # headless browser
```

or for GUI
```sh
yarn run e2e:gui 
```
select E2E testing, select browser and select spec called `render-users.cy.ts`

## Running tests in Cypress container

Make sure that React app is running on port 3000. Create Cypress image as per official docs and run container.

```sh
docker build -f Dockerfile.base -t cypress-runner .
docker run --rm --entrypoint bash cypress-runner -c "npx cypress run"
```

We attached shell of the container and executed command for headless test.