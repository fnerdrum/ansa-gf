var faker = require('faker');

var _talere = [];
var _deltagere = {};
for (var i = 1; i <= 200; i++) {
    _deltagere[i] = faker.name.findName();
}

var database = {

    getTalere: function () {
        return _talere;
    },

    addTaler: function (taler) {
        _talere.push(taler);
    },

    getDeltagere: function () {
        return _deltagere;
    }

};


module.exports = database;