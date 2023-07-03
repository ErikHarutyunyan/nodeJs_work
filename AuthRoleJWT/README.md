# Installation guide

## Setup Server

1. cd  /server
2. npm install
3. npm dev


# AuthRoleJWT

AuthRoleJWT is a simple authentication system that uses JSON Web Tokens (JWT) to authenticate users and grant them access to certain endpoints based on their assigned roles.

## Endpoints

### /register

```

### '/api/v1/login

The `'/api/v1/login` endpoint allows users to obtain a JWT token by providing their email address and password. The API will then check if the user exists in the database and if the provided password matches the hashed password in the database. If the authentication is successful, the API will return a JWT token that can be used to access other endpoints that require authentication.

```

### '/api/v1/refreshToken

The `'/api/v1/refreshToken` endpoint allows users to obtain a new access token by providing a valid refresh token. The API will then check if the refresh token is valid and if it matches a user in the database. If the validation is successful, the API will return a new access token.

```

### '/api/v1/logout

The `'/api/v1/logout` endpoint allows users to invalidate their access and refresh tokens. The API will then add the refresh token to a blacklist to prevent it from being used again. After logging out, the user will need to obtain a new set of tokens by logging in again.

```

## Conclusion

AuthRoleJWT provides a simple and secure way to authenticate users and grant them access to certain endpoints based on their assigned roles. By using JWT tokens, the API can ensure that only authorized users can access certain resources, while also making it easy to implement token-based authentication in your application.