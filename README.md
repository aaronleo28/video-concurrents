# Installation Instructions

- clone the repo and cd into it
- run `docker-compose build`
- run `docker-compose run --rm --no-deps video-concurrents bash -ci 'npm install'`
- run `docker-compose up`

## Register

- send this post req to get a user token, adding in your own username and password

    ```
    curl --request POST --header "Content-Type: application/json" --data '{"username":"{username}","password":"{password}"}' http://localhost:3000/api/v1/register
    ```

- take the returned token and add a `Authorization: Bearer {token}` header for future requests

## Login

- send this post req with your login credentials to get a token

    ```
    curl --request POST --header "Content-Type: application/json" --data '{"username":"{username}","password":"{password}"}' http://localhost:3000/api/v1/login
    ```

