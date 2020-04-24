# USER LIST APPLICATION

[LIVE DEMO](http://felipepavanela78601.ipage.com/users_list_application/)

A simple User Management System which there is two types of Users: 
1. Admin user —> who can List, Update, and Delete any User.
2. Normal user —> who can Sign Up, List Users.
 
Actions that can be performed:
- Any one can sign up. 
- Signed up user can login.
- Logged in user can log out.
- Any user can see the list of users.
- Admin users can edit any user's details when logged in.
- Admin users can delete any other user.

## How to Run This App

Install dependencies.
```
$ git clone https://github.com/felipe-mapa/users_list_application.git
$ cd users_list_application
$ npm install
$ cd backend
$ composer install
```

Import "users_list_db.sql" database

Run backend server.
```
$ cd ..
$ php -S 127.0.0.1:8000
```

Open another terminal and run React
```
npm start
```

*if using XAMPP, make sure main directory (or just backend) is inside /xampp/htdocs