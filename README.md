# Trip Planner

# Table of Contents

1. [Creators](#creators)
1. [Overview](#overview )
1. [Installation](#installation)
1. [License](#license)

# Creators
## Anne Hastings

  LinkedIn: https://www.linkedin.com/in/annehastings/
  Github: https://github.com/AnneMiriam

## Hanna Negash

LinkedIn: https://www.linkedin.com/in/hannanegash/
Github: https://github.com/Hanna-N9 

## Kimberly Palmer

LinkedIn: https://www.linkedin.com/in/kimberly-l-palmer/
Github: https://github.com/kimberlylpalmer 

# Overview

Trip Planner allows users to log in to access their account by entering their username and password or sign up to create a new account by adding a username, email address, and password. A user can see their list of trips with destination, occasion, start date, and end date. One can use a form to create a new trip, update their information, or delete a trip as one would like. At the end, the log-out button is pressed to login page.

# Installation
- Fork and clone this repository, and open it in your code editor
- Open a terminal
  - Run `pipenv install` to install the dependencies
  - Run `pipenv shell` to create a virtual environment
  - Navigate to the server directory by `cd server`
  - To create a database is to run these commands,
      - `flask db init`
      - `flask db migrate -m "Initial migration."`
      - `flask db upgrade`
  - Run `python seed.py`
  - Run `python app.py` to start the server
- Open another terminal
  - Navigate to the client directory by `cd client`
  - Run `npm install` to install dependencies
  - Run `npm start` to start a server


# License 

MIT License

Copyright (c) 2024 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Trip Planner"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Trip Planner, and to permit persons to whom the Trip Planner is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Trip Planner.

THE Trip Planner IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE Trip Planner OR THE USE OR OTHER DEALINGS IN THE
Trip Planner.






