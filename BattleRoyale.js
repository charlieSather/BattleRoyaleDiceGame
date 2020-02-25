"use strict";

const totalPlayers = 10;
var players = [];
var totalRounds = 6;
var currentRound = 0;
var diceSet = [4, 6, 8, 10, 12, 20];

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

function rollDiceSet(set) {
    let rolls = [];

    set.forEach((dice) => {
        rolls.push(rollDice(dice));
    });

    return rolls;
}

var getSum = (rolls) => rolls.reduce((total, value) => total + value, 0);

var rollDice = (dice) => getRandom(dice);

var getRandom = (max) => Math.floor(Math.random() * max) + 1;


function playRound() {
    players.forEach((value) => {
        value.Rolls = rollDiceSet(diceSet);
        value.RoundScore = getSum(value.Rolls);
    });
}

function removeLowestOne(array){
    let minIndex = 0;

    let min = array.reduce((min, value, index ) => {
        if(value.RoundScore < min){
            minIndex = index;
            return value.RoundScore;
        }
        else{
            return min
        }
    }, array[0].RoundScore); 

    array.splice(minIndex, 1);
}

function removeLowestTwo(array){
    removeLowestOne(array);
    removeLowestOne(array);
}
function appendResults(){
    document.getElementById("Board").innerHTML = "";
    players.forEach(x =>{
        console.log(x.ToString())
        var p = document.createTextNode(x.ToString());
        var b = document.createElement("br"); 
        document.getElementById("Board").appendChild(p);
        document.getElementById("Board").appendChild(b);

    })
}


var diceShootOut = () => players.forEach( p => {
    p.Rolls = rollDiceSet([20,20,20,20]);
    p.RoundScore = p.Rolls[rollDice(4) - 1];
});

function gameRound() {
    currentRound++;
    if(currentRound < 4){
        playRound();
        console.log(players);
        removeLowestTwo(players);
        appendResults();
    }
    else if(currentRound < 6){
        playRound();
        console.log(players);
        removeLowestOne(players);
        appendResults();
    }
    else{
        diceShootOut();
        console.log(players);
        removeLowestOne(players);
        appendResults();
        Winner();
    }
}

function Winner() {
    
    alert(players[0].Name + " wins!\n" + "score: " + players[0].RoundScore );
}

