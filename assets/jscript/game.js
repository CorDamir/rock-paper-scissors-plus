function chooseRandomly(){
    switch(Math.round(Math.random()*4)){
        case 0: return "rock";
        case 1: return "scissors";
        case 2: return "paper";
        case 3: return "spock";
        case 4: return "lizard";
    }
}

function handleChoiceClick(){
    let playerChoice = this.getAttribute("id");
    let computerChoice = chooseRandomly();
    console.log(playerChoice + "VS" + computerChoice); 
}

function initialSetup(){
    let choices = document.getElementsByClassName("choice-container");
    for (choice of choices) choice.addEventListener("click", handleChoiceClick);
}

window.onload = initialSetup();