var _talere = [];
var _deltagere = {};

var database = {

    getTalere: function () {
        return _talere;
    },

    addTaler: function (taler) {
        _talere.push(taler);
    },

    uploadDeltagere: function (deltagere) {
        _deltagere = deltagere;
    },

    getDeltagere: function () {
        return _deltagere;
    }

};


module.exports = database;