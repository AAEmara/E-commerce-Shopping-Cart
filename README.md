# E-commerce Shopping Cart

## Table of Contents
- [Introduction](#introduction)
  - [What is E-commerce Shopping Cart?](#what-is-e-commerce-shopping-cart)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation Instructions](#installation-instructions)
- [Usage](#usage)
- [License](#license)

## Introduction
### What is E-commerce Shopping Cart?
It's a web app that is used to help _registered users_ or _guests_ to *view*
the different products on the platform, *add* it into their carts and *checkout*
by using the payment gateway for their orders made according to their shopping cart.

## Technologies Used
  - **Runtime Environment**: Node.js
  - **Data Tier** Aka _"Model"_: MongoDB, Mongoose
  - **Application Tier** Aka _"Control"_: Express.js
  - **Presentation Tier** Aka _"View"_: React.js
  - **Documentation & API-Documentation**: JSDoc, and Swagger
  - **Containerization**: Docker, Docker-Compose

## Project Structure
  - `containers/`: used to hold docker-compose configurations for different
                   environments (e.g., Development, Test, and Production)
  - `env/`: used to hold the environment variables for the different
  	    environments
  - `scripts/`: used to hold bash scripts to automate different operations
  - `server/`: used to hold the server side business logic, models, test, etc.

## Features
### Current Features
- User Authentication
- Product Management
- Shopping Cart
- Checkout
### Features Backlog
- Frontend UI

## Installation Instructions
1. **Clone the repository**:
  ```bash
  https://github.com/AAEmara/E-commerce-Shopping-Cart.git
  cd E-commerce-Shopping-Cart
  ```
2. **Set up environment variables**:
  ```bash
  ls env # shows the different directories for services that contains the .env
  vim env/server/.env.dev
  ```

  ```
  NODE_ENV=development
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  ACCESS_TOKEN_EXP_MS=your_access_token_expiration_period_in_milliseconds
  ACCESS_TOKEN_SECRET=your_access_token_secret
  REFRESH_TOKEN_EXP_MS=your_refresh_token_expiration_period_in_milliseconds
  REFRESH_TOKEN_SECRET=your_refresh_token_secret
  SESSION_SECRET=your_express_session_secret
  EMAIL_USER=your_application_email
  EMAIL_PASS=your_application_email_password
  ```

## Usage
1. **Build Docker Image**:
  ```bash
  ./scripts/docker-compose/dev/build # at the root of the project
  ```

## Deployment

* **Backend API:** localhost:5000/api-docs
* **Frontend API:** localhost:5001/
