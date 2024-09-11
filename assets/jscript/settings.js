/** shows range value as text in settings */
function handleRangeSetting(){
    document.getElementById("win-condition").innerText = this.value;
}

/** hides modal, adjusts player name and calls game script */
function startGame(){
    let name = document.getElementById("player-name");
    if (!name.value) name.value = "PLAYER";

    document.getElementById("game-tag").innerText = name.value;
    
    document.getElementById("modal-container").style.display = "none";
    initialSetup();
}

/** opens new game start settings */
function newGame(){
    document.getElementById("modal-container").style.display = "flex";
}

/** sets listeners for game start button and range input */ 
function setSettings(){
    document.getElementById("start-button").addEventListener("click", startGame);
    document.getElementById("win-score").addEventListener("input", handleRangeSetting);
    document.getElementById("game-start").addEventListener("click", newGame);
}

window.onload = setSettings();