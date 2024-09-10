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
                lizard: [`Your ${p.scissors} decapitate my ${c.lizard}! Maybe it can grow back!`, 1],
                spock: [`My ${c.spock} smashes your ${p.scissors}!`, 0],
            },
            lizard: { 
                rock: [`My ${c.rock} crushes your ${p.lizard}! I got this.`, 0],
                paper: [`Your ${p.lizard} eats my ${c.paper}! And I got school tomorrow.`, 1],
                scissors: [`My ${c.scissors} decapitate your ${p.lizard}! Head isn't a tail.`, 0],
                spock: [`Your ${p.lizard} poisons my ${c.spock}!`, 1],
            },
            spock: { 
                rock: [`Your ${p.spock} vaporizes my ${c.rock}!`, 1],
                paper: [`My ${c.paper} disproves your ${p.spock}! I'm the best.`, 0],
                scissors: [`Your ${p.spock} smashes my ${c.scissors}! An angry Vulcan!`, 1],
                lizard: [`My ${c.lizard} poisons your ${p.spock}!`, 0],
            }
        };
    //if choice is identical return draw, otherwise use result cases
    if (playerChoice === computerChoice) return [`I also chose ${computerChoice}. This round is a draw!`, 2];
    return results[playerChoice][computerChoice];
}
/**
 * takes content of received element
 * and increments it by one 
 */
function setScore(element){
    let score = parseInt(element.innerText);
    element.innerText = ++score;
}
/**
 * handles gameplay on user selection
 * and updates html with message and 
 * score
 */
function handleChoiceClick(){
    let playerChoice = this.getAttribute("id");
    let computerChoice = chooseRandomly();
    let result = determineResult(playerChoice,computerChoice);
    
    //set the result message
    document.getElementById("message").innerHTML = result[0]; 

    //set score
    switch(result[1]){
        case 0: setScore(document.getElementById("computer-score")); break;
        case 1: setScore(document.getElementById("player-score")); break;
        default: break; //no action needed on draw
    }
}
/* #e05263 - use for computer color
   #12bdeb - use for player color
   #d9dbdf - default on page load
*/
function handleMouseOver(){
    this.style.backgroundColor = "#14bdeb";
}   

function handleMouseOut(){
    this.style.backgroundColor = "#d9dbdf";
}
/**
 * adds event listeners to all game choices
 */
function initialSetup(){
    let choices = document.getElementsByClassName("choice-container");
    
    for (let choice of choices) {
        choice.addEventListener("click", handleChoiceClick);
        choice.addEventListener("mouseover", handleMouseOver);
        choice.addEventListener("mouseout", handleMouseOut);
    }
}

window.onload = initialSetup();