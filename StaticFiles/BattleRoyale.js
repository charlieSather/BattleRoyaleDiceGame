"use strict";

const totalPlayers = 10;
var players = [];
var eliminatedPlayers = [];
var currentRound = 0;

/* Dice sets */
var diceSet = [4, 6, 8, 10, 12, 20];
var shootoutSet = [20, 20, 20, 20];
var finalDice = 4;

/* Dice sets */
var prelimRounds = 2;
var quarterFinalRounds =1;

function setupGame(){
    setupPlayers();
    document.getElementById("game-setup-btn").hidden = true;
    document.getElementById("greeting").hidden = true;
    document.getElementById("play-btn").hidden = false;
    document.getElementById("dataHolder").hidden = false;
    appendWinners();
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

function getLowestIndex(array){
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
    
    return minIndex;
    // array.splice(minIndex, 1);
}
function removePlayers(array, numPlayers){
    eliminatedPlayers = [];
    for(let i = 0; i < numPlayers; i++){
        let minIndex = getLowestIndex(array);
        eliminatedPlayers.push(array[minIndex]);
        array.splice(minIndex, 1);
    }
}

// function removeLowestTwo(array){
//     let indexOne = getLowestIndex(array);
//     let indexTwo = getLowestIndex(array);
// }

function appendWinners(){
    document.getElementById("Board").innerHTML = "";
    players.forEach(x =>{
        console.log(x.ToString())
        var p = document.createElement("p");
        p.innerText = x.ToString();
        document.getElementById("Board").appendChild(p);
    });
}

function appendLosers(){
    document.getElementById("eliminatedPlayers").innerHTML = "";
    eliminatedPlayers.forEach(x =>{
        console.log(x.ToString())
        var p = document.createElement("p");
        p.innerText = x.ToString();
        document.getElementById("eliminatedPlayers").appendChild(p);
    });

}

var diceShootOut = () => players.forEach( p => {
    p.Rolls = rollDiceSet(shootoutSet);
    p.RoundScore = p.Rolls[rollDice(finalDice) - 1];
});

function displayRound(){
    currentRound++;
    document.getElementById("round-box").innerHTML = "Round " + currentRound;
}

function gameRound() {
    displayRound();
    if(players.length > 4){
        playRound();
        console.log(players);
        removePlayers(players, 2);
        appendWinners();
        appendLosers();
    }
    else if(players.length > 2 && players.length <= 4){
        playRound();
        console.log(players);
        removePlayers(players, 1);
        appendWinners();
        appendLosers();
    }
    else if(players.length > 0 && players.length <= 2){
        diceShootOut();
        console.log(players);
        removePlayers(players, 1);
        appendWinners();
        appendLosers();
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

