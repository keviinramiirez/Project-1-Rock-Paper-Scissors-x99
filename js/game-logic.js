const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';

let playerOneMoveOneType,
    playerOneMoveTwoType,
    playerOneMoveThreeType,
    playerOneMoveOneValue,
    playerOneMoveTwoValue,
    playerOneMoveThreeValue,

    playerTwoMoveOneType,
    playerTwoMoveTwoType,
    playerTwoMoveThreeType,
    playerTwoMoveOneValue,
    playerTwoMoveTwoValue,
    playerTwoMoveThreeValue;


//Takes a string representing a player (in the form of 'Player One'
//or 'Player Two'), three move types, and three move values, and sets
//the correct global move variables.
function setPlayerMoves(player, moveOneType, moveOneValue, moveTwoType,
                      moveTwoValue, moveThreeType, moveThreeValue) {
    var sum = moveOneValue + moveTwoValue + moveThreeValue;
    if (isMoveTypeValid(moveOneType) && isMoveValueValid(moveOneValue) && isMoveTypeValid(moveTwoType) &&
        isMoveValueValid(moveTwoValue) && isMoveTypeValid(moveThreeType) && isMoveValueValid(moveThreeValue)
        && !(sum > 99))
    {
        if (player == "Player One") {
            playerOneMoveOneType = moveOneType;
            playerOneMoveOneValue = moveOneValue;
            playerOneMoveTwoType = moveTwoType;
            playerOneMoveTwoValue = moveTwoValue;
            playerOneMoveThreeType = moveThreeType;
            playerOneMoveThreeValue = moveThreeValue;
        }
        else if (player == "Player Two") {
            playerTwoMoveOneType = moveOneType;
            playerTwoMoveOneValue = moveOneValue;
            playerTwoMoveTwoType = moveTwoType;
            playerTwoMoveTwoValue = moveTwoValue;
            playerTwoMoveThreeType = moveThreeType;
            playerTwoMoveThreeValue = moveThreeValue;
        }
    }
}

//Returns true if move type equals rock or paper or sciessors. False otherwise
function isMoveTypeValid(moveType) {
    return (moveType == ROCK || moveType == PAPER || moveType == SCISSORS);
}
//Returns true if move value equals between 1 and 99. False otherwise
function isMoveValueValid(moveValue) {
    return (moveValue >= 1 && moveValue <= 99);
}

//Compares both player's move types and values for that round,
//and returns the appropriate winner
function getRoundWinner(roundNumber) {
    if (typeof roundNumber === 'number') {
        if (roundNumber < 1 || roundNumber > 3)
            return null;
        switch (roundNumber)
        {
            case 1:
                return getRoundResult(playerOneMoveOneType,
                                      playerOneMoveOneValue,
                                      playerTwoMoveOneType,
                                      playerTwoMoveOneValue);
                break;
            case 2:
                return getRoundResult(playerOneMoveTwoType,
                                      playerOneMoveTwoValue,
                                      playerTwoMoveTwoType,
                                      playerTwoMoveTwoValue);
                break;
            case 3:
                return getRoundResult(playerOneMoveThreeType,
                                      playerOneMoveThreeValue,
                                      playerTwoMoveThreeType,
                                      playerTwoMoveThreeValue)
                break;
            default:
                return null;
                break;
        }
    }
}

//Returns round winner
function getRoundResult(playerOneType, playerOneValue, playerTwoType, playerTwoValue) {
    if (!(playerOneType && playerTwoType && playerOneValue && playerTwoValue))
        return null;

    //if it's a Tie, compares the values (strengths).
    if (playerOneType === playerTwoType) {
        if (playerOneValue > playerTwoValue)
            return "Player One";
        else if (playerOneValue < playerTwoValue)
            return "Player Two";
        else
            return "Tie";
    }
    else if (playerOneType == ROCK) {
        if (playerTwoType == PAPER)
            return "Player Two";
        else if (playerTwoType == SCISSORS)
            return "Player One";
    }
    else if (playerOneType == PAPER) {
        if (playerTwoType == ROCK)
            return "Player One";
        else if (playerTwoType == SCISSORS)
            return "Player Two";
    }
    else if (playerOneType == SCISSORS) {
        if (playerTwoType == ROCK)
            return "Player Two";
        else if (playerTwoType == PAPER)
            return "Player One";
    }
}

//Compares both player's move types and values for the whole game
//and returns the appropriate winner.
function getGameWinner() {
    if (!(playerOneMoveOneType && playerOneMoveTwoType && playerOneMoveThreeType &&
          playerOneMoveOneValue && playerOneMoveTwoValue && playerOneMoveThreeValue &&
          playerTwoMoveOneType && playerTwoMoveTwoType && playerTwoMoveThreeType &&
          playerTwoMoveOneValue && playerTwoMoveTwoValue && playerTwoMoveThreeValue))
        return null;

    var playerOneWon = 0, playerTwoWon = 0;
    for (var i = 1; i <= 3; i++) {
        var roundWinner = getRoundWinner(i);
        if (roundWinner === 'Player One')
            playerOneWon++;
        else if (roundWinner === 'Player Two')
            playerTwoWon++;
    }
    if (playerOneWon >= 2)
        return "Player One";
    else if (playerTwoWon >= 2)
        return "Player Two";
    else
        return 'Tie';
}

//Chooses three random moves for player two
function setComputerMoves() {
    var types = [ROCK, PAPER, SCISSORS];
    var moveOneType = types[Math.floor(Math.random() * 3)];
    var moveTwoType = types[Math.floor(Math.random() * 3)];
    var moveThreeType = types[Math.floor(Math.random() * 3)];
    var moveOneValue = 1 + Math.floor(Math.random() * 95);
    var moveTwoValue = 1 + Math.floor(Math.random() * (95 - moveOneValue));
    var moveThreeValue = 99 - moveOneValue - moveTwoValue;

    setPlayerMoves('Player Two', moveOneType, moveOneValue,
                    moveTwoType, moveTwoValue, moveThreeType, moveThreeValue);
}

function clearMoves() {
    playerOneMoveOneType = undefined;
    playerOneMoveOneValue = undefined;
    playerOneMoveTwoType = undefined;
    playerOneMoveTwoValue = undefined;
    playerOneMoveThreeType = undefined;
    playerOneMoveThreeValue = undefined;

    playerTwoMoveOneType = undefined;
    playerTwoMoveOneValue = undefined;
    playerTwoMoveTwoType = undefined;
    playerTwoMoveTwoValue = undefined;
    playerTwoMoveThreeType = undefined;
    playerTwoMoveThreeValue = undefined;
}
