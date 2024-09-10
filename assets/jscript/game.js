function handleChoiceClick(){
    let choiceId = this.getAttribute("id");
    console.log(choiceId);
}

function initialSetup(){
    let choices = document.getElementsByClassName("choice-container");
    for (choice of choices) choice.addEventListener("click", handleChoiceClick);
}

window.onload = initialSetup();