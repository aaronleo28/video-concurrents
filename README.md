# Installation Instructions

- clone the repo and cd into it
- run `docker-compose build`
- run `docker-compose run --rm --no-deps video-concurrents bash -ci 'npm install'`
- run `docker-compose up`

## See it working instructions

1. Visit http://localhost:3000/register and create an account.

2. Open 3 streams in different tabs.

3. Open a fourth stream in another tab and see the restriction.

4. Close one of the original 3 tabbed streams.

5. Refresh the fourth stream and see it working.

6. Go to http://localhost:3000/logout if you want to log out

## API Register

- To register for an api token use the below method of auth
- send this post req to get a user token, adding in your own username and password

    ```
    curl --request POST --header "Content-Type: application/json" --data '{"username":"{username}","password":"{password}"}' http://localhost:3000/api/v1/register
    ```

- take the returned token and add a `Authorization: Bearer {token}` header for future requests

## API Login

- send this post req with your login credentials to get a token

    ```
    curl --request POST --header "Content-Type: application/json" --data '{"username":"{username}","password":"{password}"}' http://localhost:3000/api/v1/login
    ```

