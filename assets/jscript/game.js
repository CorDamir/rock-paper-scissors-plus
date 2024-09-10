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
    //define results as results.playerChoice.computerChoice[message, result]
    const results = {
            rock: { 
                paper: ["My paper covers your rock! Point for me.", 0],
                scissors: ["Your rock crushes my scissors! One for you.", 1],
                lizard: ["Your rock crushes my lizard! You win this one.", 1],
                spock: ["My Spock vaporizes your rock!", 0],
            },
            paper: { 
                rock: ["Your paper covers my rock! Point for you.", 1],
                scissors: ["My scissors cut your paper! I can win this!", 0],
                lizard: ["My lizard eats your paper! Mmmm tasty!", 0],
                spock: ["Your paper disproves my Spock! Good logic!", 1],
            },
            scissors: { 
                rock: ["My rock crushes your scissors! One for me.", 0],
                paper: ["Your scissors cut my paper! Ouch.", 1],
                lizard: ["Your scissors decapitate my lizard! Maybe it can grow back!", 1],
                spock: ["My Spock smashes your scissors!", 0],
            },
            lizard: { 
                rock: ["My rock crushes your lizard! I got this.", 0],
                paper: ["Your lizard eats my paper! And I got school tomorrow.", 1],
                scissors: ["My scissors decapitate your lizard! Head isn't a tail.", 0],
                spock: ["Your lizard poisons my Spock!", 1],
            },
            spock: { 
                rock: ["Your Spock vaporizes my rock!", 1],
                paper: ["My paper disproves your Spock! I'm the best.", 0],
                scissors: ["Your Spock smashes my scissors! An angry Vulcan!", 1],
                lizard: ["My lizard poisons your Spock!", 0],
            }
        }
        
    //if choice is identical return draw, otherwise use result cases
    if (playerChoice === computerChoice) return [`I also chose ${computerChoice}. This round is a draw!`, 2];
    return results[playerChoice][computerChoice];
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
    document.getElementById("message").innerText = result[0]; 

    //set score
    switch(result[1]){
        case 0:
            let computerScoreLocation =  document.getElementById("computer-score");
            let computerScore = parseInt(computerScoreLocation.innerText[2]);
            computerScore++;
            computerScoreLocation.innerHTML = "S " + computerScore;
            break;
        
        case 1: 
            let playerScoreLocation =  document.getElementById("player-score");
            let playerScore = parseInt(playerScoreLocation.innerText[0]);
            playerScore++;
            playerScoreLocation.innerHTML = playerScore + " V";
            break;
        
        default: break; //in case of draw no need to update scores
    }                
}

/**
 * adds event listeners to all game choices
 */
function initialSetup(){
    let choices = document.getElementsByClassName("choice-container");
    for (choice of choices) choice.addEventListener("click", handleChoiceClick);
}

window.onload = initialSetup();