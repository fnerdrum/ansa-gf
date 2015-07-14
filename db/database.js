var _talere = [
    {name: 'Name', number: 1}
    , {name: 'Name', number: 2}
    , {name: 'Name', number: 3}
    , {name: 'Name', number: 7}
    , {name: 'Name', number: 8}
    , {name: 'Name', number: 9}
    , {name: 'Name', number: 10}
    , {name: 'Name', number: 110}
];

var database = {

    getAll: function () {
        return _talere;
    },

    add: function (taler) {
        _talere.push(taler);
    }

};


module.exports = database;