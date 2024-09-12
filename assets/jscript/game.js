/**
 * generates a random number [0-4] and uses
 * that to return random game choice (string value)
 */
function chooseRandomly(){
    switch(Math.round(Math.random()*4)){
        case 0: return "rock";
        case 1: return "scissors";
        case 2: return "paper";
        case 3: return "spock";
        case 4: return "lizard";
    }
}
/**
 * determines a result and
 * @returns array [string message to display, winner]
 * 0 - computer wins
 * 1 - player is a winner
 * 2 - it's a draw
 */
function determineResult(playerChoice, computerChoice){
    //define html text to color code choices
    const c = { //c for computer
            rock: '<span style="color: red">rock</span>',
            paper: '<span style="color: red">paper</span>',
            scissors: '<span style="color: red">scissors</span>',
            lizard: '<span style="color: red">lizard</span>',
            spock: '<span style="color: red">Spock</span>'
        };
    const p ={ //p for player
            rock: '<span style="color: blue">rock</span>',
            paper: '<span style="color: blue">paper</span>',
            scissors: '<span style="color: blue">scissors</span>',
            lizard: '<span style="color: blue">lizard</span>',
            spock: '<span style="color: blue">Spock</span>'
        };
        
    //define results as results.playerChoice.computerChoice[message, result]
    const results = {
            rock: { 
                paper: [`My ${c.paper} covers your ${p.rock}! Point for me.`, 0],
                scissors: [`Your ${p.rock} crushes my ${c.scissors}! One for you.`, 1],
                lizard: [`Your ${p.rock} crushes my ${c.lizard}! You win this one.`, 1],
                spock: [`My ${c.spock} vaporizes your ${p.rock}!`, 0],
            },
            paper: { 
                rock: [`Your ${p.paper} covers my ${c.rock}! Point for you.`, 1],
                scissors: [`My ${c.scissors} cut your ${p.paper}! I can win this!`, 0],
                lizard: [`My ${c.lizard} eats your ${p.paper}! Mmmm tasty!`, 0],
                spock: [`Your ${p.paper} disproves my ${c.spock}! Good logic!`, 1],
            },
            scissors: { 
                rock: [`My ${c.rock} crushes your ${p.scissors}! One for me.`, 0],
                paper: [`Your ${p.scissors} cut my ${c.paper}! Ouch.`, 1],
                lizard: [`Your ${p.scissors} decapitate my ${c.lizard}!`, 1],
                spock: [`My ${c.spock} smashes your ${p.scissors}!`, 0],
            },
            lizard: { 
                rock: [`My ${c.rock} crushes your ${p.lizard}! I got this.`, 0],
                paper: [`Your ${p.lizard} eats my ${c.paper}! My homework!`, 1],
                scissors: [`My ${c.scissors} decapitate your ${p.lizard}!`, 0],
                spock: [`Your ${p.lizard} poisons my ${c.spock}!`, 1],
            },
            spock: { 
                rock: [`Your ${p.spock} vaporizes my ${c.rock}!`, 1],
                paper: [`My ${c.paper} disproves your ${p.spock}! I'm great.`, 0],
                scissors: [`Your ${p.spock} smashes my ${c.scissors}! An angry Vulcan!`, 1],
                lizard: [`My ${c.lizard} poisons your ${p.spock}!`, 0],
            }
        };
    //if choice is identical return draw, otherwise use result cases
    if (playerChoice === computerChoice) return [`I also chose ${computerChoice}. This round is a draw!`, 2];
    return results[playerChoice][computerChoice];
}
/**
 * animates all choices to winner color
 * and displays final message
*/ 
function endGame(playerWon){
    let color = "maroon";
    let animation = "rotateX(360deg)";
    let endMessage = "COMPUTER WON!"

    if (playerWon) {
        color = "blue";
        animation = "rotateY(360deg)";
        endMessage = document.getElementById("game-tag").innerText + " WON!";
    }

    let message = document.getElementById("message");
    //red and NOT maroon for text on computer win
    playerWon ? message.style.color = color : message.style.color = "red";
    message.innerText = endMessage;

    let choices = document.getElementsByClassName("choice-container");
    
    for(let choice of choices) {
        choice.style.backgroundColor = color;
        choice.style.transform = animation;
    }
}
/**
 * takes content of received element
 * and increments it by one
 */
function setScore(element){
    let score = parseInt(element.innerText);
    element.innerText = ++score;  
}
/* 
   blue + Y-axis rotation for player
   reddish + X-axis rotation for computer 
*/
function animateChoices(playerChoice, computerChoice){
    playerChoice.style.backgroundColor = "blue";
    playerChoice.style.transform = "rotateY(360deg)";
    computerChoice.style.backgroundColor = "maroon";
    computerChoice.style.transform = "rotateX(360deg)";
}
function removeListeners(choices){
    for(let choice of choices) {
        choice.removeEventListener("click", handleChoiceClick);
        choice.removeEventListener("mouseover", handleMouseOver);
        choice.removeEventListener("mouseout", handleMouseOut);
    }
}
/* resets all game-choices to starting style */
function resetStyle(){
    for (let choice of document.getElementsByClassName("choice-container")){
        choice.style.transform = "rotateX(0deg)";
        choice.style.transform = "rotateY(0deg)";
        choice.style.backgroundColor = "#d9dbdf";
    }
}
/**
 * handles gameplay on user selection
 * and updates html with message and 
 * score
 */
function handleChoiceClick(){
    //remove user interaction, then add it back after
    //animation time
    removeListeners(document.getElementsByClassName("choice-container"));
    setTimeout(initialSetup, 1205);

    let playerChoice = this.getAttribute("id");
    let computerChoice = chooseRandomly();
    let result = determineResult(playerChoice,computerChoice);

    //reset all elements to default styling
    resetStyle();

    //rotation and color animation to make choices clear
    animateChoices(this, document.getElementById(computerChoice));

    //set the result message
    document.getElementById("message").innerHTML = result[0]; 

    //set score
    switch(result[1]){
        case 0: setScore(document.getElementById("computer-score")); break;
        case 1: setScore(document.getElementById("player-score")); break;
        default: //animate for draw
            this.style.backgroundColor = "darkmagenta";
            this.style.transform = "rotateY(360deg)";
            break;
    }  
}

function handleMouseOver(){
        resetStyle();
        this.style.backgroundColor = "dodgerblue";
}   

function handleMouseOut(){
    if(this.style.backgroundColor === "dodgerblue")  
        this.style.backgroundColor = "#d9dbdf";
}
/**
 * reverses rotations to set up next animation
 * event
 */
function revertTransition(event){
    if (event.propertyName === "transform") {
        this.style.transform = "rotateY(0deg)";
        this.style.transform = "rotateX(0deg)";
    };
}
/** checks if game ended and calls gameEnd function
*/
function gameEnded(){
    let playerScore = document.getElementById("player-score").innerText;
    let computerScore = document.getElementById("computer-score").innerText;
    let winCondition = document.getElementById("win-condition").innerText;

    switch (winCondition) {
        case playerScore: endGame(true); return true;
        case computerScore: endGame(false); return true;
        default: return false;
    }
}
/**
 * adds event listeners to all game choices
 */
function initialSetup(){
    if (gameEnded()) return;
    
    let choices = document.getElementsByClassName("choice-container");

    for (let choice of choices) {
        choice.addEventListener("click", handleChoiceClick);
        choice.addEventListener("mouseover", handleMouseOver);
        choice.addEventListener("mouseout", handleMouseOut);
        choice.addEventListener("transitionend", revertTransition);
    }
}