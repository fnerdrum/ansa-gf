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
    fjernTaler: function (id) {
        _talere = _talere.filter(function (taler) {
            return taler.id != id;
        });
    },

    uploadDeltagere: function (deltagere) {
        _deltagere = deltagere;
    },

    getDeltagere: function () {
        return _deltagere;
    }

};


module.exports = database;