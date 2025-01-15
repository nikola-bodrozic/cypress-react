# Cypress Spec Testing

```sh
# create container from prod image 
docker run -d --name react-nginx -p 80:8000 nikolabod/react-nginx:latest

# build and push cypress image
docker build . -f Dockerfile.base -t nikolabod/cypress-runner
docker push nikolabod/cypress-runner

#run test
docker run -it --rm --entrypoint bash cypress-runner -c "npx cypress run"
```

clean up `docker rm -f react-nginx`


