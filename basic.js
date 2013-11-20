var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , http = require('http')
  , BinaryServer = require('binaryjs').BinaryServer;

app.listen(83);


function handler (req, res) {
  fs.readFile(__dirname + '/webaudioapi.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading webaudioapi.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

var udp = dgram.createSocket("udp4", function(){
  console.log('message');
});

var message = new Buffer("Some bytes");
setInterval(function(){
  udp.send(message, 0, message.length, 41234, "localhost", function(err, bytes) {
    console.log(bytes);
  });
}, 5000);

io.sockets.on('connection', function (socket) {
  socket.on('init', function (data) {
    io.sockets.emit('init', {"file": __dirname + '/flower.png', "client": data});
  });
  socket.on('play', function (data) {
    io.sockets.emit('play', data);
  });
  socket.on('pause', function (data) {
    io.sockets.emit('pause', data);
  });
});

var binaryserver = new BinaryServer({server: app, path: '/binary-endpoint'});
binaryserver.on('connection', function(client){ 
  var file = fs.createReadStream(__dirname + '/flower.png');
  //var stream = client.createStream();
  //file.pipe(stream);
  client.send(file); 
});
