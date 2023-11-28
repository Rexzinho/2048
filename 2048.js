var board;
var score = 0;
var add = 0;
var rows = 4;
var columns = 4;
var aux=0;
let scoreTemp = 0;
var GameOverContagem = 0;
var VictoryContagem = 0;
const audio1 = new Audio();
audio1.src = "./ButtonSoundEffect.mp3";
const audio2 = new Audio();
audio2.src = "./ButtonSoundEffect.mp3";
const audio3 = new Audio();
audio3.src = "./ButtonSoundEffect.mp3";
const audio4 = new Audio();
audio4.src = "./ButtonSoundEffect.mp3";

window.onload = function() {
    setGame();
}

// Função para deixar o jogo pronto para ser jogado
function setGame(){
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    /*
    board = [
        [2, 2, 2, 2],
        [2, 2, 2, 2],
        [4, 4, 8, 8],
        [4, 4, 8, 8]
    ]*/

    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            if (window.location.href.includes('Minecraft.html')){
                document.getElementById("boardMine").append(tile);
            }
            if (window.location.href.includes('Sap.html')){
                document.getElementById("boardSap").append(tile);
            }
            if (window.location.href.includes('Standard.html')){
                document.getElementById("board").append(tile);
            }
        }
    }
    setTwo();
    setTwo();
    // setTwo serve para que apareça algum bloco 2 aleatóriamente no board. Quando o jogo começa, é necessário que tenham 2 blocos 2 espalhados por ele, então essa função é chamada duas vezes.
}

function hasEmptyTile(){
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){
            if(board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}

//Função para gerar um bloco 2 aleatoriamente
function setTwo(){
    if(!hasEmptyTile()){
        return;
    }

    let found = false;
    while(!found){
        // random r, c
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            if (window.location.href.includes('Minecraft.html')){
                 tile.classList.add("m2"); 
            }
            if (window.location.href.includes('Sap.html')){
                tile.classList.add("s2"); 
            }
            if (window.location.href.includes('Standard.html')){
                tile.classList.add("x2");
             }
            found = true;
        }
    }
}

//Função para atualizar o estilo css de cada um dos blocos
function updateTile(tile, num){
    tile.innerText = "";
    tile.classList.value = ""; // Limpa a tile para não ter mais de uma classe
    tile.classList.add("tile");
    if (window.location.href.includes('Minecraft.html')){
        tile.classList.add("mine");
    }
    if (window.location.href.includes('Sap.html')){
        tile.classList.add("sap");
    }
    if (window.location.href.includes('Standard.html')){
    }
    
    if (num > 0){
        tile.innerText = num;
        if (num == 2048){
            document.getElementById('Win').style.display = 'flex';
        }
        if (num <= 4096){
            if (window.location.href.includes('Minecraft.html')){
                tile.classList.add("m"+num.toString())
            }
            if (window.location.href.includes('Sap.html')){
                tile.classList.add("s"+num.toString())
            }
            if (window.location.href.includes('Standard.html')){
            tile.classList.add("x"+num.toString())
            }
        }
        else{
            tile.classList.add("x8192")
        }   
    }

}

//Função para o funcionamento das teclas do jogo. 
document.addEventListener("keyup", (e) => {
    scoreTemp = 0;
    switch(e.code){
    case "ArrowLeft":
    case "KeyA":
        slideLeft();
        setTwo();
        GameOver();
        if(GameOverContagem==0){
        audio1.play();
        }
    break;
    case "ArrowRight":
    case "KeyD":
        slideRight();
        setTwo();
        GameOver();
        if(GameOverContagem==0){
            audio2.play();
        }
        break;
    case "ArrowUp":
    case "KeyW":
        slideUp();
        setTwo();
        GameOver();
        if(GameOverContagem==0){
            audio3.play();
        }
        break;
    case "ArrowDown":
    case "KeyS":
        slideDown();
        setTwo();
        GameOver();
        if(GameOverContagem==0){
            audio4.play();
        }
        break;
    }
    
    add = scoreTemp != 0 ? (`(+${scoreTemp})`) : "    ";
    document.getElementById("add").innerText = add;
    document.getElementById("score").innerText = score;
})

function filterZero(row){
    return row.filter(num => num != 0); // Cria um cópia do vetor só que sem 0
}

function slide(row){
    //[0, 2, 2, 2]
    row = filterZero(row);  // Limpa os zeros -> [2, 2, 2]
    //slide
    for(let i = 0; i < row.length-1; i++){
        //verifica todo 2
        if(row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
            scoreTemp += row[i] // A variável scoreTemp serve para armazenar somente o valor que a variável score ganhou quando uma tecla foi pressionada, se tratando do valor que aparece ao lado do score no jogo, mostrando quanto que foi ganho na última jogada
        } // [2, 2, 2] -> [4, 0, 2]
    }

    row = filterZero(row); // [4, 2]

    //Adiciona zeros onde está sem
    while(row.length < columns){
        row.push(0);
    } // [4, 2, 0, 0]

    return row;
}

// Função feita para que o estilo CSS dos blocos seja atualizado quando o jogo for reiniciado
function refresh(){
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideLeft(){
    for (let r = 0; r < rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight(){
    for (let r = 0; r < rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp(){
    for (let c = 0; c < columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        /*
        board [0][c] = row[0];
        board [1][c] = row[1];
        board [2][c] = row[2];
        board [3][c] = row[3];
        */
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r]; // usando 1 linha o invés de 4
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown(){
    for (let c = 0; c < columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

// Função para verificar se o jogo está em GameOver ou não
function GameOver(){
    for (let r = 0; r < rows; r++) 
    {
        for (let c = 0; c < columns; c++) 
        {
            if (board[r][c] === 0) {
                return; 
                // Há um tile vazio, então o jogo ainda não acabou
            }
            if (c < columns - 1 && board[r][c] === board[r][c + 1]) {
                return; 
                //  Existem tiles iguais adjacentes horizontalmente, então um movimento é possível
            }
            if (r < rows - 1 && board[r][c] === board[r + 1][c]) {
                return; 
                // Existem tiles iguais adjacentes verticalmente, então um movimento é possível
            }
        }
    }
    document.getElementById('Over').style.display = 'flex';
    GameOverContagem++; // A GameOverContagem serve como um controle para que outras funções não sejam possíveis quando o jogo está no estado de GameOver
    if(GameOverContagem==1){
    const gameOver = new Audio();
    gameOver.src = "GameOver.mp3";
    gameOver.play();
    }
}

// Função para que o jogo seja iniciado quando clicado no botão Restart
function ResetGame(){
    GameOverContagem=0;
    VictoryContagem=0;
    score = 0;
    document.getElementById('Over').style.display = 'none';
    document.getElementById('Win').style.display = 'none';
    document.getElementById("score").innerText = score;
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    refresh();
    setTwo();
    setTwo();
    document.getElementById('restart').style.display = 'none';
}

function ganhar(){
    VictoryContagem++;
    if(VictoryContagem==1 && GameOverContagem==0){
    const victory = new Audio();
    victory.src = "./Victory.mp3";
    victory.play();
    }
    if(!hasEmptyTile()){
        return;
    }

    let found = false;
    while(!found){
        // random r, c
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if(board[r][c] == 0){
            board[r][c] = 2048;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2048";
            tile.classList.add("x2048");
            found = true;
        }
    }
    refresh();
}
