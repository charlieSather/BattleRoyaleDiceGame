"use strict"

const numPlayers = 10;
var players = [];
var rounds = 6;
var currentRound = 1;
var diceSet = [4,6,8,10,12,20]

function setupPlayers(){
    for(let i = 1; i <= numPlayers; i++){
        players.push({
            Name: "Player " + i , 
            Rolls:[],
            RoundScore: 0
        });
    }
}

setupPlayers();

// var i = () => {
//         for(let i = 0; i < 100; i ++){
//             console.log(getRandom(4));
//     }
// }

// i();


function rollDiceSet(){
    let rolls = [];
    diceSet.forEach(function (value,index, array){
        let roll = rollDice(value);
        rolls.push(roll);
    });
    return rolls;
}

function getSum(rolls){
    return rolls.reduce(function(total, value){
        return total + value;
    },0);
}

function rollDice(numSides){
   return getRandom(numSides)
}

function getRandom(max){
    return Math.floor(Math.random() * max) + 1; 
}

function playRound(){
    players.forEach(function(value,index,array){
        value.Rolls = rollDiceSet(value);
        value.RoundScore = getSum(value.Rolls);
    });
}
playRound();
console.log(players);

function roundWinner(players){

}

function diceShootOut(){

}