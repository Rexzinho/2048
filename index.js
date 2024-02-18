const boardDisplay = document.querySelector(".boardDisplay");
const displayScore = document.getElementById("displayScore");
const displayGameOver = document.getElementById("displayGameOver");
let isGameOver = false;

let board = [[]];

let score = 0;

function createDisplayBoard(){

    for(let i=0; i<4; i++){

        for(let j=0; j<4; j++){

            const newSquare = document.createElement("div");
            newSquare.id = `${i}-${j}`;
            newSquare.classList = "square";
            boardDisplay.append(newSquare);

        }
    }

}

function updateDisplayBoard(){

    for(let i=0; i<4; i++){
        
        for(let j=0; j<4; j++){

            const square = document.getElementById(`${i}-${j}`);

            square.classList = "square";

            if(board[i][j] <= 8192){
                square.classList.add("x" + board[i][j]);
            }
            else{
                square.classList.add("x" + 8192);
            }

            if(board[i][j] == 0){
                square.textContent = "";
            }
            else{
                square.textContent = board[i][j];
            }
            
            if(square.textContent != 0){
                square.style.scale = "0.9";
                setTimeout(() => {
                    square.style.scale = "1";
                }, 100)
            }
        }
    }

}

function hasZero(){

    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            if(board[i][j] == 0){
                return true;
            }
        }
    }

}

function gerateTwo(){

    if(!hasZero()){
        return;
    }

    let i = 0;

    while(i < 1){

        let randNum1 = Math.floor(Math.random() * 4);
        let randNum2 = Math.floor(Math.random() * 4);

        if(board[randNum1][randNum2] == 0){

            let chance = Math.floor(Math.random() * 10) + 1;
            
            if(chance == 10){
                board[randNum1][randNum2] = 4;
            }
            else{
                board[randNum1][randNum2] = 2;
            }
            i++;
        }
        else{

        }

    }

}

document.addEventListener("keydown", event => {

    if(gameOver()){
        return;
    }

    switch(event.key){
            
        case "ArrowDown":
        case "s":
            moveDown();
            gerateTwo();
            updateDisplayBoard();
            break;

        case "ArrowUp":
        case "w":
            moveUp();
            gerateTwo();
            updateDisplayBoard();
            break;

        case "ArrowLeft":
        case "a":
            moveLeft();
            gerateTwo();
            updateDisplayBoard();
            break;

        case "ArrowRight":
        case "d":
            moveRight();
            gerateTwo();
            updateDisplayBoard();
            break;
    }

});

function clearZeros(row){

    let newRow = row.filter(element => element !== 0);
    return newRow;

}


function slide(row){

    for(let i=0; i<row.length-1; i++){

        if(row[i] == row[i+1]){

            row[i] = row[i] * 2;
            row[i+1] = 0;

            score += row[i];

            displayScore.style.fontSize = "1.2rem";

            setTimeout(() => {
                displayScore.style.fontSize = "1.4rem";
                displayScore.textContent = score;
            }, 100);

        }

    }

    return row;

}

function moveDown(){

    for(let i=0; i<4; i++){

            let row = [];

            for(let j=0; j<4; j++){

                row.push(board[j][i]);

            }

            row = clearZeros(row);
            row = slide(row);
            row = clearZeros(row);
           
            // completing with zeros
            while(row.length !== 4){
                row.unshift(0);
            }

            // updating the board
            for(let j=0; j<4; j++){

                board[j][i] = row[j];

            }

    }

}

function moveUp(){

    for(let i=0; i<4; i++){

            let row = [];

            for(let j=0; j<4; j++){

                row.push(board[j][i]);

            }

            row = clearZeros(row);
            row = slide(row);
            row = clearZeros(row);

            // completing with zeros
            while(row.length !== 4){
                row.push(0);
            }

            // updating the board
            for(let j=0; j<4; j++){

                board[j][i] = row[j];

            }

    }

}

function moveLeft(){

    for(let i=0; i<4; i++){

            let row = [];

            for(let j=0; j<4; j++){

                row.push(board[i][j]);

            }

            row = clearZeros(row);
            row = slide(row);
            row = clearZeros(row);
            
            // completing with zeros
            while(row.length !== 4){
                row.push(0);
            }

            // updating the board
            for(let j=0; j<4; j++){

                board[i][j] = row[j];

            }

    }

}

function moveRight(){

    for(let i=0; i<4; i++){

            let row = [];

            for(let j=0; j<4; j++){

                row.push(board[i][j]);

            }

            row = clearZeros(row);
            row = slide(row);
            row = clearZeros(row);
            
            // completing with zeros
            while(row.length !== 4){
                row.unshift(0);
            }

            // updating the board
            for(let j=0; j<4; j++){

                board[i][j] = row[j];

            }

    }

}

function gameOver(){

    if(hasZero()){
        return false;
    }

    for(let i=0; i<4; i++){
        for(let j=0; j<3; j++){
            if(board[i][j] == board[i][j+1] || board[j][i] == board[j+1][i]){
                return false;
            }
        }
    }

    if(isGameOver == false){
        isGameOver = true;
        displayGameOver.style.display = "block";
        displayGameOver.style.scale = "0.9";
        setTimeout(() => {
            displayGameOver.style.scale = "1";
        }, 200);
    }
    return true;

}

function setGame(){

    isGameOver = false;
    displayGameOver.style.display = "none";

    score = 0;
    displayScore.textContent = score;

    boardDisplay.style.scale = "0.96";

    setTimeout(() => {

        board = [[0, 0, 0, 0], 
                 [0, 0, 0, 0],
                 [0, 0, 0, 0],
                 [0, 0, 0, 0]];

        gerateTwo();
        gerateTwo();
        updateDisplayBoard();

        boardDisplay.style.scale = "1";

    }, 100);

}


createDisplayBoard();
setGame();
