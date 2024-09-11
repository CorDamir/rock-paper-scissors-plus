/** shows range value as text in settings */
function handleRangeSetting(){
    document.getElementById("win-condition").innerText = this.value;
}

/** hides modal and calls game script */
function startGame(){
    for (let modal of document.getElementsByClassName("modal-container")) 
        modal.style.display="none";
    
    initialSetup();
}

/** sets listeners for game start button and range input */ 
function setSettings(){
    document.getElementById("start-button").addEventListener("click", startGame);
    document.getElementById("win-score").addEventListener("input", handleRangeSetting);
}

window.onload = setSettings();