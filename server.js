const { response } = require("express");
// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...

app.get('/quotes', (request, response) => {
  response.send(quotes);
});

app.get('/quotes/random', (request, response) => {
  const randomNumber = Math.floor(Math.random() * quotes.length)
  const randomQuote = quotes[randomNumber];
  response.send(randomQuote)
});

app.get('/quotes/search', (request, response) => {

  let query = request.query.term.toLowerCase();

   const filteredQueryArray = quotes.filter(el => el.quote.includes(query))
  

   if(filteredQueryArray.length == 0){
    console.log(` Query without first word ${query.slice(1)}`)
    console.log(` Query with first character in Upper case ${query.charAt(0).toUpperCase()}`)
    console.log(` Sum of the previous ${query.charAt(0).toUpperCase()+query.slice(1)}`)
    const filteredQueryArray2 = quotes.filter(el => el.quote.includes(query.charAt(0).toUpperCase() + query.slice(1)))
    response.send(filteredQueryArray2)
   }else{
    response.send(filteredQueryArray)
   }
//http://localhost:5000/quotes/search?term= halfway there
});



//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
let port = 5000;

app.listen( port, function () {
  console.log("Your app is listening on port " + port);
});
