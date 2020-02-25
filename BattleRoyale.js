"use strict"

const numPlayers = 10;
var players = [];
var rounds = 6;
var currentRound = 1;
var dice = [4,6,8,10,12,20]

function setupPlayers(){
    for(let i = 1; i <= numPlayers; i++){
        players.push({
            Name: "Player " + i , 
            RoundScore: 0
        });
    }
}

setupPlayers();
console.log(players);

var i = () => {
        for(let i = 0; i < 100; i ++){
            console.log(getRandom(4));
    }
}

i();


function rollDiceSet(player){
    let sum = 0;
    player
    players.forEach(function (value,index, array){
        sum += rollDice()
    })
}


function rollDice(numSides){
   return getRandom(numSides)
}

function getRandom(max){
    return Math.floor(Math.random() * max) + 1; 
}

function playRound(){

}

function diceShootOut(){

}