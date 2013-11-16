var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(82);

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

io.sockets.on('connection', function (socket) {
  //socket.emit('news', { hello: 'world' });
  socket.on('userData', function (data) {
    io.sockets.emit('update', data);
  });
  socket.on('play', function (data) {
    io.sockets.emit('play', data);
  });
  socket.on('pause', function (data) {
    io.sockets.emit('pause', data);
  });
  // setInterval(function(){
  //   socket.emit('update', {hello: "Hello"});
  // }, 10000);
});
