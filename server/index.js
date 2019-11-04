"use strict";
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var jwt = require('jsonwebtoken');
//app.user(bodyParser.json());
// after the code that uses bodyParser and other cool stuff
var originsWhitelist = [
    'http://localhost:4200',
];
var corsOptions = {
    origin: function (origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
};
//here is the magic
app.use(cors(corsOptions));
// app.use(cors({ origin: '*' }));
app.use(express.json());
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
//https://www.codementor.io/mayowa.a/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3 
//session implmentation....
app.use(session({
    key: 'user_sid',
    secret: '#BeAm$',
    user: {},
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use(function (req, res, next) {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});
// middleware function to check for logged-in users
var sessionChecker = function (req, res, next) {
    // Get auth header value
    var bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        var bearer = bearerHeader.split(' ');
        // Get token from array
        var bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    }
    else {
        // Forbidden
        res.sendStatus(403);
    }
};
app.post('/Process', sessionChecker, function (req, res) {
    console.log(req.session.id);
    if (req.session && req.session.views) {
        console.log("HollaHoop");
        req.session.views++;
        console.log('TotalViews' + req.session.views);
    }
    else {
        req.session.views = 1;
        console.log(req.session.views);
    }
    return res.send('TotalViews' + req.session.views);
});
// route for Home-Page
app.get('/', function (req, res) {
    res.redirect('/login');
});
// route for user logout
app.get('/logout', function (req, res) {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    }
    else {
        res.redirect('/login');
    }
});
//PORT ENVIRONMENT VARIABLE
var port = process.env.PORT || 8084;
app.listen(port, function () { return console.log("Listening on port " + port + ".."); });
