function handleRangeSetting(){
    document.getElementById("win-condition").innerText = this.value;
}

function startGame(){
    alert("start pressed!");
}

function setSettings(){
    document.getElementById("start-button").addEventListener("click", startGame);
    document.getElementById("win-score").addEventListener("input", handleRangeSetting);
}

window.onload = setSettings();