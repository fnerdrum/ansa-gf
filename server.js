var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, '../public')});
});

var port = Number(process.env.PORT || 8080);

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);

});