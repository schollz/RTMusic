var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , dgram = require('dgram')

app.listen(80);


function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
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
  socket.emit('news', { hello: 'world' });
  socket.on('userData', function (data) {
    io.sockets.emit('update', data);
  });
  // setInterval(function(){
  //   socket.emit('update', {hello: "Hello"});
  // }, 10000);
});
