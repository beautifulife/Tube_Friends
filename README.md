# Tube_Friends

## Introduction

![Tube_Friends](https://user-images.githubusercontent.com/41249563/55355179-8f100c80-5502-11e9-9170-d1679da81dbc.gif)

**Tube_Friends** is a YouTube curation service designed to solve the limitations of YouTube recommendation system which is based on popularity. Curators share curations on YouTube videos and subscribers subscribe to curators to consume curations.

## Installation

From your project directory, run the following:

1. Development Environment
```sh
$ npm install
# client and server
$ npm run dev
# visit http://localhost:3000
```

2. Production Environment
```sh
$ npm install
# make client
$ npm run build
# run server
$ npm start
```

## Features

* Google social login
* Write curation using markdown editor
* Relation between users (Follow, like, Feeds)
* Sort by categories and features

## Client-Side

* Using modern Javascript with babel
* Implement component-based UI architecture using React, Webpack, CSS Modules
* State management using redux
* Routing using react-router
* Google firebase login 

## Server-Side

* Server-side platform based on JavaScript engine (V8 engine) Node.js
* Using es5+ Javascript with babel
* Using express, simple and flexible Node.js web application framework
* Using firebase-admin for user management
* MongoDB, Mongoose ODM

## Test

* Using Jest for testing javascript code
* Using Enzyme for testing React component

## Continuous Integration

* Using CircleCI for continuous integration of source management / build / test / deployment

## Deployment

* Using Elastic Beanstalk for deploying and managing applications

## Version Control

* Use github repository for version control
* Branch, merge-based development progress

## Collaboration Tool

* Using Slack for team member communication
* Using Trello for schedule management and task allocation

## Challenges

* Depending on the login, and the logged-in user, the information displayed needs to be different, and additional information such as subscription and like should be provided, thus increasing the complexity. To solve this problem, we created a schema that makes it easy to sorting and classify the articles from the DB design. I processed the desired information from the server through the parameter values ​​from the client and reduced the complexity in the client.

## Things to do

* Improve routing logic
* Add integration test and end-to-end test
* Code refactoring(Improving code reusability)
* BugFix
* Improving mobile support(Improving recognition rate and Adding mobile broadcasting)
* Improving Reactive design

## Sincere Thanks
[Ken Huh](https://github.com/Ken123777) / Vanilla Coding