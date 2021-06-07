var http = require("http");
var fs = require("fs");

var server = http.createServer(function (req, res) {
  fs.readFile("./main.html", "utf-8", function (error, content) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  });
});
// Chargement de socket.io
// var io = require('socket.io').listen(server);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const client = io.of("/client");
const api = io.of("/api");
const speech = io.of("/speech");

// Quand un client se connecte, on le note dans la console
client.on("connection", function (client) {
  console.log("Un client est connecté !" + io.of('/client').id);
  client.emit("message", {
    content: "AKW@BA",
  });
  client.on("speak", function(data){
    speech.emit("pitch", {
      content: data,
    });
  });
});

client.on("info-personal", function (data) {
  console.log(data);
});



// Communication with Python API
api.on("connection", function (api) {
  console.log("Connexion via API namespace!" + io.of('/api').id);
  api.emit("message", {
    content: "AKW@BA",
  });
  api.on("info-personal", function (data) {
    client.emit("test", {
        content: data,
    });
    console.log(data);
    console.log(typeof(data));
  });
});



// Communication with Python API
speech.on("connection", function (speech) {
  console.log("Connexion via speech namespace!" + io.of('/speech').id);
  speech.emit("pitch", {
    content: "Connexion socket établie.",
  });

});




server.listen(9400);

// const io = require("socket.io-client");
// const socket = io ( "192.168.252.249:8000");
