export function randomInt(min , max){
    return Math.floor(Math.random() * (max - min) + min);
}

export function opButton(button, op){
    const buttons = document.getElementsByClassName("b-item")
    for (var i =1; i < buttons.length; i++){

        if(!(buttons[i].innerHTML === button) && op === true){
            buttons[i].disabled = true;
            buttons[i].style.backgroundColor = "#D0B7E8"
        }else if(buttons[i].innerHTML === button && op === true){
            buttons[i].disabled = true;
        }else {
            buttons[i].disabled = false;
            buttons[i].style.backgroundColor = "#6085C1"
        }
        
    }
}

