var _talere = [];
var _deltagere = {};

var database = {

    getTalere: function () {
        return _talere;
    },

    addTaler: function (taler) {
        taler.id = Math.floor(Math.random() * 1000000);
        _talere.push(taler);
        return taler;
    },

    uploadDeltagere: function (deltagere) {
        _deltagere = deltagere;
    },

    getDeltagere: function () {
        return _deltagere;
    }

};


module.exports = database;