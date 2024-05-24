const express = require('express');
const app = express();
const session = require('express-session');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const ping = require('ping');

const port = process.env.PORT || 1234;
const router = require('./routes/newUserRoute.js');
const Bug = require('./models/bugs.js');

const server = http.createServer(app);
const io = socketIo(server);

const host = '216.24.57.4';
const interval = 10000;

function probeHost(host) {
  ping.sys.probe(host, function (isAlive) {
    let msg = isAlive ? `${host} is alive` : `${host} is dead`;
    console.log(msg);
    // Emit the status to connected clients
    io.emit('hostStatus', { host, isAlive });
  });
}

setInterval(() => {
  probeHost(host);
}, interval);

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.set('view engine', 'ejs');

app.use(session({
  secret: 'wdqwdm12p', // Replace with your secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use('/auth', router);

app.get('/', function (req, res, next) {
  res.sendFile(__dirname + "/views/auth.html");
});

app.post('/submit', async function (req, res, next) {
  try {
    res.sendFile(__dirname + '/views/thanks.html');
    await Bug.create(req.body);
    io.emit('newBugReport', req.body);
  } catch (error) {
    console.log(error);
  }

  console.log(req.body);
});

app.get('/ticket', async (req, res, next) => {
  res.render('index', {
    name: req.body.name
  });
});

async function startServer() {
  await mongoose.connect('mongodb+srv://bugtracker:bugtracker98@bugtracker.jhxnl1m.mongodb.net/');
  server.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}

startServer();
