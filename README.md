# Cypress Spec Testing

This repo shows how to test React app in in one container using Cypress that is in other container.

Image `nikolabod/react-nginx` has route `/users` that renders users from API end point `https://jsonplaceholder.typicode.com/users`. 
The end point is  and it's mocked so during Cypress testing no live API is requred.
This solution can be integrated in CI/CD pipeline.
Mock data are in `cypress/fixtures/users.json`. Spec is in `cypress/e2e/spec.cy.js`. Base URL is in `cypress.config.ts`

```sh
# create container from prod image 
docker run -d --name react-nginx -p 80:8000 <docker-hub-user>/react-nginx:latest

# build and push cypress image
docker build . -f Dockerfile.base -t <docker-hub-user>/cypress-runner
docker push <docker-hub-user>/cypress-runner

#run test
docker run -it --rm --entrypoint bash cypress-runner -c "npx cypress run"
```

clean up `docker rm -f react-nginx`

Source code with Dockerfile for `nikolabod/react-nginx` is at [https://gitlab.com/jackwrfv/react-starter](https://gitlab.com/jackwrfv/react-starter)