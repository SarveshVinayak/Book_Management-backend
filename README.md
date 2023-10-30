# Description

This is a NodeJS backend repo for Books Managament RESTful APIs using MongoDB, Express, Passport, JWT

## API Endpoints

1. {{baseURL}}/user/auth/signup <br>
   User signup API which requires 3 parameters, i.e. name, email and password.
   If the email is already used then the API throws an error that same email already exists.

2. {{baseURL}}/user/auth/login <br>
   User login API which requires 2 parameters, i.e email and password.
   If the email provided doesn't match any profile, then the API throws an error that the email/user doesn't exist.
   If the password doesn't match the user password, then the API throws an error that the password is incorrect.

3. {{baseURL}}/user/auth/logout <br>
   User logout API which only requires the bearer token, which is given in the login response.

4. {{baseURL}}/user/books/list <br>
   Books list API to list all books created by the User, It also takes 2 parameters in the query/params i.e.
   page and limit for pagination.

5. {{baseURL}}/user/books/detail <br>
   Book details API to fetch details of a specific book, It takes 1 parameter which is the id.
   If the id is incorrect, then the API throws an error that the Book doesn't exist.

6. {{baseURL}}/user/books/create <br>
   Book addition API to create new books, It takes 3 parameters i.e title, author and summary.

7. {{baseURL}}/user/books/update <br>
   Bood update API to update the book details, It takes 4 parameters i.e bookId, title, author and summary.
   If the id is incorrect, then the API throws an error that the Book doesn't exist.

8. {{baseURL}}/user/books/delete <br>
   Book deletion API to delete a book, It takes 1 parameter i.e. id.
   If the id is incorrect, then the API throws an error that the Book doesn't exist.

#### Note: All the APIs under /user/books require bearer token for authentication

## Installation

1. Clone the repository
2. Install necessary packages using _npm i_ command
3. Create .env file in the root folder using the .env.example file
4. Replace the keys in .env with required values
5. Start the project by typing the command _npm start_ in the terminal
