var _talere = {};
var _deltagere = {};

var database = {

    getTalere: function (id) {
        return _talere[id] || [];
    },

    addTaler: function (id, taler) {
        _talere[id] = _talere[id] || [];

        taler.id = Math.floor(Math.random() * 1000000);
        _talere[id].push(taler);
        return taler;
    },

    fjernTaler: function (id, taler) {
        _talere[id] = _talere[id].filter(function (t) {
            return t.id != taler;
        });
    },

    uploadDeltagere: function (deltagere) {
        var id = Math.floor(Math.random() * 1000000);
        _deltagere[id] = deltagere;
        return id;
    },

    getDeltagere: function (id) {
        return _deltagere[id];
    }

};


module.exports = database;