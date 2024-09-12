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

    document.getElementById("settings").style.display = "none";
    document.getElementById("modal-container").style.display = "none";

    resetStyle();
    initialSetup();
}

/** opens new game settings */
function newGame(){
    document.getElementById("modal-container").style.display = "block";
    document.getElementById("settings").style.display = "flex";
}

function showInfo(){
    document.getElementById("modal-container").style.display = "block";
    document.getElementById("how-to-play").style.display = "block";
}

/** sets listeners for game start button and range input */ 
function setSettings(){
    document.getElementById("start-button").addEventListener("click", startGame);
    document.getElementById("win-score").addEventListener("input", handleRangeSetting);
    document.getElementById("new-game").addEventListener("click", newGame);
    document.getElementById("rules").addEventListener("click", showInfo);
    document.getElementById("close-info").addEventListener("click", closeInfo);
}

window.onload = setSettings();