# Cypress Testing

This repo shows how to test React app that makes API call to [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users) and then render list on Users page.
That call is mocked in spec at `cypress/e2e/spec.cy.ts`

## Install

```sh
yarn
yarn start
```
open app on [localhost:3000](localhost:3000)

## Spec Testing

in file `cypress.config.ts` you can change base URL

and then start cypress testing

```sh
npx cypress open
```

or in headless browser
```sh
npx cypress run
```

Mock data are in `cypress/fixtures/users.json` 