# Cypress Spec Testing

This repo shows how to test SPA app in container using Cypress that is also in container.

Image `<docker-hub-user>/react-nginx` has page `/users` that renders users from json typicode. 
The end point is `https://jsonplaceholder.typicode.com/users` and it's mocked so during testing no live API is requred.
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


