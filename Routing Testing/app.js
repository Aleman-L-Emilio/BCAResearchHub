const express = require('express');
const auth0 = require('auth0');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.redirect('/login');
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/login.html'));
});

app.get('/callback', (req, res) => {
  res.redirect('/landing');
});

app.get('/landing', (req, res) => {
  res.sendFile(path.join(__dirname, '/landing.html'));
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});