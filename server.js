var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db/database');


app.use(bodyParser.json());
app.use(express.static('public'));

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
    db.addTaler(req.body);
    res.sendStatus(201); // Created
});

var port = Number(process.env.PORT || 8080);

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);

});