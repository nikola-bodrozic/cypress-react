# Cypress Testing

This is React app that makes API call to https://jsonplaceholder.typicode.com/users and then render list on Users page.
That call is mocked in spec at `cypress/e2e/spec.cy.ts`

## Install

install

```sh
yarn
yarn start
```
open app on `localhost:3000`

## Test Spec

in file `cypress.config.ts` you can change React URL 

and then start cypress testing

```sh
npx cypress open
```

or in headless browser
```sh
npx cypress run
```