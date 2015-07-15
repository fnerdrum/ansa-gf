var fs = require('fs');
var faker = require('faker');

var antall = process.argv[2] || 100;

var deltagere = '';
for (var i = 1; i <= antall; i++) {
    deltagere += i + ',' + faker.name.findName();
    if (i <= antall) deltagere += '\n';
}

fs.writeFile("deltagere.csv", deltagere, function (err) {
    if (err) {
        return console.log(err);
    }

    console.log('Done!');
});