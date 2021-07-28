var app = require('express')();
var server = require('http').Server(app);
var WebSocket = require('ws');

var wss = new WebSocket.Server({ port: 8888 });

wss.on('connection', function connection(ws) {
  console.log('server: receive connection.');

  ws.on('message', function incoming(message) {
    ws.send('server: reply');
  });

  // ws.on('pong', () => {
  //   console.log('server: received pong from client');
  // });

  ws.on('close',() => {
    console.log("close")
  })

  ws.send('send data');

  // setInterval(() => {
  //     ws.ping('', false, true);
  // }, 2000);
});

app.get('/', function (req, res) {
  console.log(123123123, 'qinqu')
  res.send('Hello World!')
  // res.sendfile(__dirname + '/index.html');
});

app.get('/test', function (req, res) {
  console.log(123123123, 'qinqu')
  res.send('Hello World!')
  // res.sendfile(__dirname + '/index.html');
});
app.listen(3000);