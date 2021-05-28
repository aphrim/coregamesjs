# CoreGamesJs
A library meant to make interacting with the coregames.com API super easy.

# Getting Started

* Install the package using npm i coregamesjs
* Add `const {Platform} = require('CoreGamesJs')` to the top of your code.
* I reccomend looking at some of the examples to get you going then take a look at the API!

# Using

* When using functions, one that return a promise must be used in either one of 2 ways: `val = await class.classMethod()` or `class.classMethod().then(val => {doStuffwithVal})`
* When using functions that require authToken, if you are making a website, I reccomend having the authToken generation and all functions that require the authToken to be handled on your server to make it so that malicous users can't steal them. For an extra measure of safety I also reccomend creating an alt acc and use that for the credentials to generate authToken and use the authToken of that account.

# API Referance
https://aphrim.github.io/coregamesjs/API

# Examples
https://aphrim.github.io/coregamesjs/examples
