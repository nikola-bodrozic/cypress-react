# Cypress Testing

This repo shows how to test React app that makes API call to [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users) and then render list on Users page - [http://localhost:5000/users](http://localhost:5000/users)

That API call is mocked in spec at `cypress/e2e/render-users.cy.js` and corresponding JSON data are in `cypress/fixtures/mockData.json` this solution is CI/CD friendly since live API doesn't have to be up. Only react app must be up for successful Cypress testing.

## Install and run react app
serve prod bundle in `build` folder on port 5000

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
docker build -t cypresshb .
```
next step depends on OS

in Linux
```sh
docker run --rm -it --network host \
  -v $(pwd)/cypress/e2e:/opt/app/cypress/e2e \
  -v $(pwd)/cypress/fixtures:/opt/app/cypress/fixtures \
  cypresshb yarn e2e --config 'supportFile=false,baseUrl=http://localhost:5000'
```
in Windows you must set absolute path
```sh
docker run --rm -it --network host ^
  -v C:\absolute\path\to\cypress-react\cypress\e2e:/opt/app/cypress/e2e ^
  -v C:\absolute\path\to\cypress-react\fixtures:/opt/app/cypress/fixtures ^
  cypresshb yarn e2e --config "supportFile=false,baseUrl=http://localhost:5000"
```

We attached shell of the container and executed script for headless test. Spec file is in volume on path `cypress/e2e` on developer machine and in container it's `/app/cypress/e2e` and for fixtures `/cypress/fixtures` is mapped to `/app/cypress/fixtures`

## CI/CD

For CI/CD puroposes you can build react image and run container. In react folder 
```sh
docker build -t react-prod-build .
docker run -d --name react -p 5000:5000 react-prod-build 
```
start container cypresshb as described in section Running tests in Cypress container

clean up `docker rm -f react`. Cypress container exits after testing spec file.