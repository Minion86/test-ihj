const fs = require('fs');
const readline = require('readline');


const file = readline.createInterface({
    input: fs.createReadStream('./sample-input.txt'),
    output: process.stdout,
    terminal: false
});

var results = [];
let reference = '';
var teams = [];
let totals = [];

file.on('line', (line) => {
    let teamsindividual = line.split(',');
    let team1 = teamsindividual[0].split(' ');
    let team2 = teamsindividual[1].split(' ');
    let teamName1 = '';
    let teamName2 = '';

    for (let i = 0; i < team1.length - 1; i++) {
        teamName1 += team1[i] + " ";
    }
    for (let i = 0; i < team2.length - 1; i++) {
        teamName2 += team2[i] + " ";
    }

    const result = { 'team1': teamName1.trim(), 'team1Score': team1[team1.length - 1], 'team2': teamName2.trim(), 'team2Score': team2[team2.length - 1] };
    let rta1 = teams.filter(it => it === result.team1);

    if (rta1.length == 0)
        teams.push(result.team1);

    let rta2 = teams.filter(it => it === result.team2);
    if (rta2.length == 0)
        teams.push(result.team2);

    results.push(result);

}).on('close', function () {
    //console.log(JSON.stringify(results));

    //console.log(JSON.stringify(teams));

    let games = teams.length / 2;
    let cont = 1;
    results.forEach((val) => {

        if (val.team1Score > val.team2Score) {
            let rta1 = totals.filter(it => it.team === val.team1);
            if (rta1.length == 0) { totals.push({ 'team': val.team1, 'points': 3 }); }

            else {
                var filtered = totals.filter(function (it) {
                    if (it.team === val.team1) {
                        it.points = it.points + 3;
                        return true;
                    }
                    return false;
                });
            }

        }
        else if (val.team1Score < val.team2Score) {
            let rta1 = totals.filter(it => it.team === val.team2);
            if (rta1.length == 0) { totals.push({ 'team': val.team2, 'points': 3 }); }

            else {
                var filtered = totals.filter(function (it) {
                    if (it.team === val.team2) {
                        it.points = it.points + 3;
                        return true;
                    }
                    return false;
                });
            }
        }
        else {
            let rta1 = totals.filter(it => it.team === val.team1);
            if (rta1.length == 0) { totals.push({ 'team': val.team1, 'points': 1 }); }
            else {
                var filtered = totals.filter(function (it) {
                    if (it.team === val.team1) {
                        it.points = it.points + 1;
                        return true;
                    }
                    return false;
                });
            }
            let rta2 = totals.filter(it => it.team === val.team2);
            if (rta2.length == 0) { totals.push({ 'team': val.team2, 'points': 1 }); }
            else {
                var filtered2 = totals.filter(function (it) {
                    if (it.team === val.team2) {
                        it.points = it.points + 1;
                        return true;
                    }
                    return false;
                });
            }
        }
        games--;

        if (games <= 0) {
            console.log("MatchDay " + cont);
            console.log(JSON.stringify(totals));
            games = teams.length / 2;
            cont++;

        }
    });

});



