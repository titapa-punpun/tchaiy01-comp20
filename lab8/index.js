// use express
var express = require('express')
var app = new express()
var body_parser = require('body-parser')

app.useBodyParser()

app.post("/submit", function(request, response) {
	var username = request.body.username;
	var score = request.body.score;
	var grid = request.body.grid;
	console.log("You submitted: " + username + ", " + score + ", " + grid);
	response.send("[]");
});

app.get("/scores.json", function(request, response) {
	var username = request.query.username; // 
	response.send({"result":"You typed in " + username});
});

app.get("/", function(request, response) {
	response.send("Go away!");
});

app.listen(process.env.PORT || 8888); // connects to heroku instead of just local

// need to install express
// package = software 
// npm = package manager (thousands of packages you can use)
// run with node index.js (once you've installed everything) 
// don't want to keep running "npm install express"
// if you want to use many dependencies in your work, use package.json (like
// you recipe card--grocery shopping) 
// run "npm install"
// pip 
// package-lock.json 
// heroku = cloud host service for the world to see 
// cloud = who the hell knows (could be anywhere, but you just want to have 
//		   access all the time)
// CLI = command line interface (makes it easy to manage your app thru terminal)
// The Heroku CLI = 