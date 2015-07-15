var faker = require('faker');

var _talere = [];
var _participants = {};
for (var i = 1; i <= 200; i++) {
    _participants[i] = faker.name.findName();
}

var database = {

    getTalere: function () {
        return _talere;
    },

    addTaler: function (taler) {
        _talere.push(taler);
    },

    getParticipants: function () {
        return _participants;
    }

};


module.exports = database;