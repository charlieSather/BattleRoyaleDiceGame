"use strict";

const totalPlayers = 10;
var players = [];
var eliminatedPlayers = [];
var currentRound = 0;

/* Dice sets */
var diceSet = [4, 6, 8, 10, 12, 20];
var shootoutSet = [20, 20, 20, 20, 4];

/* Dice rounds */
var numPlayersRemoved = 2;
var quarterFinalRounds = 1;

function setupGame(){
    setupPlayers();
    document.getElementById("game-setup-btn").hidden = true;
    document.getElementById("greeting").hidden = true;
    document.getElementById("play-btn").hidden = false;
    document.getElementById("dataHolder").hidden = false;
    document.getElementById("elimPlayers").hidden = true;
    displayRound();
    appendPlayers();
}

function setupPlayers() {
    for (let i = 1; i <= totalPlayers; i++) {
        players.push({
            Name: "Player " + i,
            Rolls: [],
            RoundScore: 0,
            ToString: function() {
                var str = this.Name;
                str += "    Rolls: { ";
                this.Rolls.forEach(x => str += x + " ");
                str += "}     ";
                str += "Score: ";
                str += this.RoundScore;
                return str;
            }
        });
    }
}

function buildTableHtmlString(players){
    var str = "<table class='table table-hover table-dark'>";
    str += "<thead><tr><th>Name</th><th>Rolls</th><th>Round Score</th></tr></thead>";
    
    str += "<tbody>"

    for(let i = 0; i < players.length; i++){
        str += "<tr>";
        str += "<td>" + players[i].Name + "</td>";
        if(players[i].Rolls.length > 1){
            str += "<td>" + players[i].Rolls.reduce((x,y) => x + ", " + y, "").substring(1) + "</td>";
        }
        else{
            str += "<td>None</td>";
        }

        str += "<td>" + players[i].RoundScore + "</td>";
        str += "</tr>";
    }
    str += "</tbody>";
    
    str += "</table>";
    return str;
}

function rollDiceSet(set) {
    let rolls = [];

    set.forEach((dice) => {
        rolls.push(rollDice(dice));
    });

    return rolls;
}

var getSum = (rolls) => rolls.reduce((total, value) => total + value, 0);

var rollDice = (dice) => getRandom(dice);

var getRandom = x => Math.floor(Math.random() * x) + 1;

var getMinIndex = (arr, min) => arr.findIndex(x => x.RoundScore == min);

var getMin = arr => arr.reduce((min,value) => value.RoundScore < min ? value.RoundScore : min, arr[0].RoundScore);

var getNumberOfDupes = (arr,dupe) => arr.reduce((counter,value) => value.RoundScore == dupe ? ++counter : counter , 0);

function rollRound(){
    players.forEach((value) => {
        value.Rolls = rollDiceSet(diceSet);
        value.RoundScore = getSum(value.Rolls);
    });
}

function displayReroll(){
    document.getElementById("elimPlayers").hidden = true;
    document.getElementById("round-box").innerHTML += "<br> Draw! Roll again.";
    appendPlayers();
}


function removePlayers(array, numPlayers){
    eliminatedPlayers = [];
    for(let i = 0; i < numPlayers; i++){
        let min = getMin(array);
        let minIndex = getMinIndex(array,min);
        eliminatedPlayers.push(array[minIndex]);
        array.splice(minIndex, 1);
    }
}

function appendPlayers(){
    document.getElementById("Board").innerHTML = buildTableHtmlString(players); 
}

function appendLosers(){
    document.getElementById("eliminatedPlayers").innerHTML = buildTableHtmlString(eliminatedPlayers);
}


var rollDiceShootOut = () => {
    players.forEach( p => {
        p.Rolls = rollDiceSet(shootoutSet);
        let finalRoll = p.Rolls[p.Rolls.length - 1];
        p.RoundScore = p.Rolls[finalRoll - 1];
    });
}

function displayRound(){
    document.getElementById("round-box").innerHTML = "Round " + currentRound;
}

function gameRound() {
    currentRound++;
    displayRound();
    if(document.getElementById("elimPlayers").hidden == true){
        document.getElementById("elimPlayers").hidden = false;
    }

    if(players.length > 4){
        rollRound();
        console.log(players);
        determineRound(numPlayersRemoved);
    }
    else if(players.length > 2 && players.length <= 4){
        rollRound();
        console.log(players);
        determineRound(1);
    }
    else if(players.length > 0 && players.length <= 2){
        rollDiceShootOut();
        determineRound(1);
    }
}

function determineRound(numRemoved){
    if(getNumberOfDupes(players, getMin(players)) > numRemoved){
        displayReroll();
    }
    else{
        removePlayers(players, numRemoved);
        appendPlayers();
        appendLosers();
    }
    if(players.length == 1){
        Winner();
    }
}

function playAgain(){
    location.reload();
}

function Winner() { 
    alert(players[0].Name + " wins!\n" + "score: " + players[0].RoundScore );
    document.getElementById("play-btn").hidden = true;
    document.getElementById("play-again-btn").hidden = false;
}

