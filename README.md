# API EBANX TEST

- This technical test project is an API implementation developed in Node.js, following the MVC (Model-View-Controller) architecture pattern.
- The API features two main endpoints: GET /balance and POST /event.
- It includes automated testing using Jest.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js and npm installed on your local machine

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/belleb23/ebanx-api-test.git

   ```

2. Navigate to the project directory

   ```sh
   cd ebanx-api-test

   ```

3. Install dependencies

   ```sh
   npm install

   ```

4. Start

   ```sh
   npm run dev

   ```

5. Open your browser and visit `http://localhost:3000`

## Testing

This project includes both automated and manual testing to ensure the reliability and functionality of the API.

### Automated Testing

Automated tests are written using Jest to validate the API endpoints. <br>
To run the automated tests, use the following command:

```sh
npm test

```

This will execute the tests and display the results in the terminal.

### Manual Testing

In addition to automated tests, you can manually test the API endpoints using tools like Postman. Below are examples of how to manually test each endpoint:

#### Testing the GET /balance Endpoint

You can retrieve the balance of an account by sending a GET request to the `/balance` endpoint with the `account_id` query parameter.

1. Open Postman.
2. Create a new GET request.
3. Enter the URL: `http://localhost:3000/balance?account_id=12345`
4. Click Send.

#### Testing the POST /event Endpoint

You can create different types of events (deposit, withdraw, transfer) by sending a POST request to the `/event` endpoint with a JSON body.

1. Open Postman.
2. Create a new POST request.
3. Enter the URL: `http://localhost:3000/event`
4. Set the header `Content-Type` to `application/json`.
5. In the body, select `raw` and enter the JSON payload.
