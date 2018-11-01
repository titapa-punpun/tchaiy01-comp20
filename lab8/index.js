// use express
var express = require('express')
var app = new express()

app.post("/submit", function(request, response) {
	response.send("[]");
});

app.get("/scores.json", function(request, response) {
	response.send("[]");
});

app.get("/", function(request, response) {
	response.send("Go away!");
});

// need to install express
// package = software 
// npm = package manager (thousands of packages you can use)
// run with node index.js 
// don't want to keep running "npm install express"
// if you want to use many dependencies in your work, use package.json (like
// you recipe card--grocery shopping) 
