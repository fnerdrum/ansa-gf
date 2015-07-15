var fs = require('fs');
var faker = require('faker');

var antall = process.argv[2] || 100;

var participants = '';
for (var i = 1; i <= antall; i++) {
    participants += i + ',' + faker.name.findName();
    if (i <= antall) participants += '\n';
}

fs.writeFile("participants.csv", participants, function (err) {
    if (err) {
        return console.log(err);
    }

    console.log('Done!');
});