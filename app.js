const express = require('express');
const path = require("path");
const app = express();

const expressSession = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

require('dotenv').config(); 

const authRouter = require("./auth");

const { auth, requiresAuth } = require('express-openid-connect');
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
  })
);

const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUnitialized: false
}

if (app.get("env") === "production") {
    session.cookie.secure = true;
}

const strategy = new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      return done(null, profile);
    }
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(expressSession(session));

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});
  
app.use("/", authRouter);
app.get('/', function (req, res) {
    res.render('index', {});
});
app.get('/workflow', function (req, res) {
  res.render('workflow', {});
});

// app.get('/', (req, res) => {
//     // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//     res.sendFile(req.oidc.isAuthenticated() ? __dirname + '/data.html' : __dirname + '/index.html');
// })

// function login() {s
//     alert("Hello");
//     app.get('/', (req, res) => {
//         alert("Hello");
//         res.sendFile(__dirname + "login");
//     })
// }

// app.get('/logout', (req, res) => {
//     res.sendFile("index.html");
// })

// app.get('/profile', requiresAuth(), (req, res) => {
//     res.send(JSON.stringify(req.oidc.user))
// })

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

// var myButton = document.getElementById('button');
// myButton.onclick = function() {
//     alert("hurb");
//     res.sendFile(__dirname + "/login");
//     window.location.href="http://localhost:3000/login"; 
// }
