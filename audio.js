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
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');

app.listen(9000);

var bs = new BinaryServer({server: app, path: '/binary-endpoint'});
bs.on('connection', function(client) {
  client.on('stream', function(stream, meta) {
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