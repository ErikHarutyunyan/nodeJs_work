# Installation guide

## Setup Server

1. cd  /server
2. npm install
3. npm dev

## Usage

The program exposes two API endpoints:

1. `GET /fish/:species` - Retrieves data on the specified fish species.

    - `species` - The key used to retrieve data on the specified fish species.

    If the specified key exists in Redis, the data is retrieved from Redis and returned in the response. If the specified key does not exist in Redis, a request is made to the FishWatch API to retrieve the data, which is then stored in Redis and returned in the response.

2. `DELETE /fish/:species` - Deletes data on the specified fish species.

    - `species` - The key used to delete data on the specified fish species.

    If the specified key exists in Redis, it is deleted and a success message is returned in the response. If the specified key does not exist in Redis, an error message is returned in the response.

## Example

To retrieve data on the Crimson Jobfish, make a GET request to `http://localhost:3000/fish/crimson-jobfish`.

To delete data on the Crimson Jobfish, make a DELETE request to `http://localhost:3000/fish/crimson-jobfish`.