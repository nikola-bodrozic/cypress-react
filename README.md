# Cypress Testing

This repo shows how to test React app that makes API call to [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users) and then render list on Users page - [http://localhost:5000/users](http://localhost:5000/users)

That API call is mocked in spec at `cypress/e2e/render-users.cy.js` and corresponding JSON data are in `cypress/fixtures/mockData.json` this solution is CI/CD friendly since live API does not to be up. Only react app must be up for successful Cypress testing. You can set baseUrl in file `cypress.config.js`

## Install and run prod build on port 5000

```sh
cd react
yarn
yarn build
npx serve -s build -l 5000
```

open app in browser [http://localhost:5000](http://localhost:5000)

in second terminal cd into cypress folder
```sh
cd cypress
yarn 
yarn e2e --config 'supportFile=false,baseUrl=http://localhost:5000'
```

or for GUI
```sh
yarn e2e:gui --config 'supportFile=false,baseUrl=http://localhost:5000'
```
select E2E testing, select browser and select spec called `render-users.cy.js`

## Running tests in Cypress container

Make sure that React app is running on port 5000. Create Cypress image and run container. In `cypress` folder:

```sh
docker build -f Dockerfile.base -t cypresshb .
docker run --rm -it --network host \
  -v $(pwd)/cypress/e2e:/opt/app/cypress/e2e \
  -v $(pwd)/cypress/fixtures:/opt/app/cypress/fixtures \
  cypresshb yarn e2e --config 'supportFile=false,baseUrl=http://localhost:5000'
```

We attached shell of the container and executed script for headless test. Spec file is in volume on path `cypress/e2e` on developer machine and in container it's `/opt/app/cypress/e2e` and for fixtures `/cypress/fixtures` is mapped to `/opt/app/cypress/fixtures`