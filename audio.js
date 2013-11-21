function handler (req, res) {
  fs.readFile(__dirname + '/audio.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading audio.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

var app = require('http').createServer(handler);
var fs = require('fs');

<<<<<<< HEAD
var BinaryServer = require('binaryjs').BinaryServer;


=======
>>>>>>> 8eb8ab6cb5bbe116e77145a89f1b4e377994f62c
app.listen(9000);
var io = require('socket.io').listen(5000);



var bs = new BinaryServer({server: app, path: '/binary-endpoint'});
<<<<<<< HEAD
// Wait for new user connections
bs.on('connection', function(client){
  // Stream a flower as a hello!
  console.log('binary ready');
  client.on('stream', function(stream, meta){
    // broadcast to all other clients
=======
bs.on('connection', function(client) {
  client.on('stream', function(stream, meta) {
>>>>>>> 8eb8ab6cb5bbe116e77145a89f1b4e377994f62c
    console.log('client activity');
    for (var id in bs.clients) {
      if (bs.clients.hasOwnProperty(id)) {
        var otherClient = bs.clients[id];
        if (otherClient != client) {
          var send = otherClient.createStream(meta);
          stream.pipe(send);
        }
      }
    }
  });
});

io.sockets.on('connection', function (socket) {
  socket.on('play', function (data) {
    io.sockets.emit('play', data);
  });
  socket.on('pause', function (data) {
    io.sockets.emit('pause', data);
  });
});