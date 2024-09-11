function handleRangeSetting(){
    alert(this.getAttribute("value"));
}

function startGame(){
    alert("start pressed!");
}

function setSettings(){
    document.getElementById("start-button").addEventListener("click", startGame);
    document.getElementById("win-score").addEventListener("input", handleRangeSetting);
}

window.onload = setSettings();