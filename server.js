var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
var db = require('./db/database');


app.use(bodyParser.json());
app.use(require('express').static('public'));

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, '../public')});
});

app.get('/services/participants', function (req, res) {
    res.send(db.getParticipants());
});

app.get('/services/participants/:number', function (req, res) {
    res.send(db.getParticipants()[req.params.number]);
});

app.get('/services/talere', function (req, res) {
    res.send(db.getTalere());
});

app.post('/services/talere', function (req, res) {
    var taler = req.body;
    db.addTaler(taler);
    res.sendStatus(201); // Created
    io.emit('taler', taler);
});

//io.on('connection', function(socket){
//    console.log('connection');
//    socket.on('disconnect', function(){
//        console.log('disconnect');
//    });
//});


var port = Number(process.env.PORT || 8080);
http.listen(port, function () {
    var host = http.address().address;
    var port = http.address().port;
    console.log('Listening at http://%s:%s', host, port);

});