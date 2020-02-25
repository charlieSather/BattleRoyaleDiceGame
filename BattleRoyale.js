"use strict";

const totalPlayers = 10;
var players = [];
var totalRounds = 6;
var currentRound = 0;
var diceSet = [4, 6, 8, 10, 12, 20];

function setupPlayers(numPlayers) {
    for (let i = 1; i <= numPlayers; i++) {
        players.push({
            Name: "Player " + i,
            Rolls: [],
            RoundScore: 0
        });
    }
}

setupPlayers(totalPlayers);

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

function gameRound() {
    round++;
    if(round < 6){
        playRound();
    }
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

// function rollTwenties(dice){
//     let rolls = [];
//     for(let i = 0; i < 4; i++){
//         rolls.push(rollDice());
//     }
//     return rolls;
// }


var diceShootOut = () => players.forEach( p => {
    p.Rolls = rollDiceSet([20,20,20,20]);
    p.RoundScore = p.Rolls[rollDice(4) - 1];
});

diceShootOut();
console.log(players);

// function diceShootOut() {
//     players.forEach( p => {
//         p.RoundSco
//     })

// }


// playRound();
// console.log(players);
// players.forEach(p => console.log(getSum(p.Rolls)));



// removeLowestTwo(players);
// console.log(players);


function roundWinner(players) {

}

