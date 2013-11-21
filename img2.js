function handler (req, res) {
  fs.readFile(__dirname + '/img2.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading webaudioapi.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}
var app = require('http').createServer(handler)
var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');
console.log('hello');

app.listen(9000);

// Start Binary.js server
var bs = new BinaryServer({server: app, path: '/binary-endpoint'});
// Wait for new user connections
bs.on('connection', function(client){
  // Stream a flower as a hello!
  client.on('stream', function(stream, meta){
    // broadcast to all other clients
    for(var id in bs.clients){
      if(bs.clients.hasOwnProperty(id)){
        var otherClient = bs.clients[id];
        if(otherClient != client){
          var send = otherClient.createStream(meta);
          stream.pipe(send);
        }
      }
    }
  });
});