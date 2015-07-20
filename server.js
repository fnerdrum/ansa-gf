var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
var multer  = require('multer')
var db = require('./db/database');


app.use(bodyParser.json());
app.use(multer({
    dest: './uploads',
    inMemory: true
}));
app.use(require('express').static('public'));

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, '../public')});
});

app.get('/services/deltagere', function (req, res) {
    res.send(db.getDeltagere());
});

app.get('/services/deltagere/:number', function (req, res) {
    res.send(db.getDeltagere()[req.params.number]);
});

app.get('/services/talere', function (req, res) {
    res.send(db.getTalere());
});

app.post('/services/talere', function (req, res) {
    var taler = req.body;
    taler.opprettet = new Date();
    taler = db.addTaler(taler);
    res.sendStatus(201); // Created
    emit('add', taler);
});

app.delete('/services/talere/:id', function (req, res) {
    var id = req.params.id;
    db.fjernTaler(id);
    res.sendStatus(200); // Ok
    emit('remove', id);
});

app.post('/services/deltagere', function(req, res) {
    var linjer = req.files.deltagere.buffer.toString('utf-8').split('\n');
    var deltagere = {};
    for (var i = 0; i < linjer.length; i++) {
        var split = linjer[i].split(',');
        deltagere[split[0]] = split[1];
    }
    db.uploadDeltagere(deltagere);
    res.sendStatus(204); // No Content
});

function emit(type, data) {
    io.emit('taler', {
        type: type,
        data: data
    });

}


var port = Number(process.env.PORT || 8080);
http.listen(port, function () {
    var host = http.address().address;
    var port = http.address().port;
    console.log('Listening at http://%s:%s', host, port);

});