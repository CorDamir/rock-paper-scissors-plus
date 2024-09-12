/** shows range value as text in settings */
function handleRangeSetting(){
    document.getElementById("win-condition").innerText = this.value;
}

/** hides modal, adjusts player name, resets scores,
 * styles, message and calls game script */
function startGame(){
    let name = document.getElementById("player-name");
    if (!name.value) name.value = "PLAYER";
    document.getElementById("game-tag").innerText = name.value.toUpperCase();
    
    document.getElementById("player-score").innerText = "0";
    document.getElementById("computer-score").innerText = "0";

    let message = document.getElementById("message");
    message.style.color =  "black";
    message.innerText = "Make your choice... I'm waiting!";

    document.getElementById("modal-container").style.display = "none";

    resetStyle();
    initialSetup();
}

/** opens new game settings */
function newGame(){
    document.getElementById("modal-container").style.display = "flex";
}

/** sets listeners for game start button and range input */ 
function setSettings(){
    document.getElementById("start-button").addEventListener("click", startGame);
    document.getElementById("win-score").addEventListener("input", handleRangeSetting);
    document.getElementById("new-game").addEventListener("click", newGame);
}

window.onload = setSettings();