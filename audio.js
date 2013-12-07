function handler (req, res) {
  
  var path = url.parse(req.url).pathname;
  if(path == '/'){
    path = '/audio.html';
  }
  fs.readFile(__dirname + path,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading audio.html');
    }
    res.writeHead(200);
    res.write(data);
    res.end();
  });
}

var app = require('http').createServer(handler);
var fs = require('fs');
var url = require('url');

var BinaryServer = require('binaryjs').BinaryServer;

var port = process.env.PORT || 5000;
app.listen(port);
// var io = require('socket.io').listen(port);
// console.log("server is good to go");


var bs = new BinaryServer({server: app, path: '/binary-endpoint'});
// Wait for new user connections
bs.on('connection', function(client){
  // Stream a flower as a hello!
  // console.log('binary ready');
  client.on('stream', function(stream, meta){
    // broadcast to all other clients
    // console.log('client activity');
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

// io.sockets.on('connection', function (socket) {
//   socket.on('play', function (data) {
//     io.sockets.emit('play', data);
//   });
//   socket.on('pause', function (data) {
//     io.sockets.emit('pause', data);
//   });
// });