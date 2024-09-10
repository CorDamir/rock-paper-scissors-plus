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
    switch(playerChoice){
        //if both choices are identical, no need to check anything else
        case computerChoice: return [`I also chose ${computerChoice}. This round is a draw!`, 2];

        case "rock":
            switch(computerChoice){
                case "paper": return ["My paper covers your rock! Point for me.", 0];
                case "scissors": return ["Your rock crushes my scissors! One for you.", 1];
                case "lizard": return ["Your rock crushes my lizard! You win this one.", 1];
                case "spock": return ["My Spock vaporizes your rock!", 0];
            }
        
        case "paper":
            switch(computerChoice){
                case "rock": return ["Your paper covers my rock! Point for you.", 1];
                case "scissors": return ["My scissors cut your paper! I can win this!", 0];
                case "lizard": return ["My lizard eats your paper! Mmmm tasty!", 0];
                case "spock": return ["Your paper disproves my Spock! Good logic!", 1];
            }

        case "scissors":
            switch(computerChoice){
                case "rock": return ["My rock crushes your scissors! One for me.", 0];
                case "paper": return ["Your scissors cut my paper! Ouch.", 1];
                case "lizard": return ["Your scissors decapitate my lizard! Maybe it can grow back!", 1];
                case "spock": return ["My Spock smashes your scissors!", 0];
            }

        case "lizard":
            switch(computerChoice){
                case "rock": return ["My rock crushes your lizard! I got this.", 0];
                case "paper": ["Your lizard eats my paper! And I got school tomorrow.", 1];
                case "scissors": return ["My scissors decapitate your lizard! Head isn't a tail.", 0];
                case "spock": return ["Your lizard poisons my Spock!", 1];
            }
        
        case "spock":
            switch(computerChoice){
                case "rock": return ["Your Spock vaporizes my rock!", 1];
                case "paper": return ["My paper disproves your Spock! I'm the best.", 0];
                case "scissors": return ["Your Spock smashes my scissors! An angry Vulcan!", 1];
                case "lizard": return ["Your lizard poisons my Spock!", 0];
            }
    }
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