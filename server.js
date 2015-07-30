var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
var path = require('path');
var multer = require('multer');
var db = require('./db/database');


app.use(bodyParser.json());
app.use(multer({
    dest: './uploads',
    inMemory: true
}));
app.use(require('express').static('public'));

app.get('/services/:id/deltagere', function (req, res) {
    res.send(db.getDeltagere(req.params.id));
});

app.get('/services/:id/talere', function (req, res) {
    var id = req.params.id;
    res.send(db.getTalere(id));
});

app.post('/services/:id/talere', function (req, res) {
    var id = req.params.id;
    var taler = req.body;
    taler.opprettet = new Date();
    taler = db.addTaler(id, taler);
    res.sendStatus(201); // Created
    emit(id, 'add', taler);
});

app.put('/services/:id/talere', function (req, res) {
    var id = req.params.id;
    var taler = req.body;
    db.endreTaler(id, taler);
    res.sendStatus(200); // Ok
    emit(id, 'change', taler);
});

app.delete('/services/:id/talere/:taler', function (req, res) {
    var id = req.params.id;
    var taler = req.params.taler;
    db.fjernTaler(id, taler);
    res.sendStatus(200); // Ok
    emit(id, 'remove', taler);
});

app.post('/services/deltagere', function (req, res) {
    var linjer = req.files.deltagere.buffer.toString('utf-8').split(/\r?\n/);
    var deltagere = {};
    for (var i = 0; i < linjer.length; i++) {
        var split = linjer[i].split(',');
        deltagere[split[0]] = split[1];
    }
    var id = db.uploadDeltagere(deltagere);
    res.status(201).json({id: id}); // Created
});

app.get('/:id', function (req, res) {
    var id = req.params.id;
    if (db.getDeltagere(id)) {
        res.sendFile('index.html', {root: path.join(__dirname, 'public')});
    } else {
        res.sendStatus(404); // Not Found
    }
});

app.get('/:id/deltagere', function (req, res) {
    var id = req.params.id;
    if (db.getDeltagere(id)) {
        res.sendFile('index.html', {root: path.join(__dirname, 'public')});
    } else {
        res.sendStatus(404); // Not Found
    }
});

function emit(id, type, data) {
    io.emit('talere-' + id, {
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