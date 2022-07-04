var board;
var playerO="O";
var playerX="X";
var currPlayer=playerO;
var gameOver=false;


   window.onload=function(){
        setgame();
    }

 
function setgame(){
    board=[
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ]
    for(let r = 0 ; r < 3 ; r++){
         for(let c = 0;c <3 ;c++){

            let box=document.createElement("div");

            box.id= r.toString() + "-" + c.toString();

            box.classList.add("box");


            if(r == 0|| r== 1){
                box.classList.add("horizontal");
            }
            if(c == 0 || c == 1){
                box.classList.add("vertical");
            }
         box.addEventListener("click",setBox);
            document.getElementById("board").append(box);
         }
    }
}

function setBox(){
    if(gameOver){
        
         return;
    }
    let coords=this.id.split("-");

    let r=parseInt(coords[0]);

    let c=parseInt(coords[1]);

    if(board[r][c] !=' '){

        return;
    }

    board[r][c]=currPlayer;

    this.innerText=currPlayer;

    if(currPlayer==playerO){

        currPlayer=playerX;

    }else{
        
        currPlayer=playerO;
    }
checkWinner();

}


function checkWinner() {
    //horizontally, check 3 rows
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            //if we found the winning row
            //apply the winner style to that row
            for (let i = 0; i < 3; i++) {
                let box = document.getElementById(r.toString() + "-" + i.toString());
                visible();
                playMusic();
          
                box.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    // vertically
    for(let c=0;c<3;c++){
        if(board[0][c]==board[1][c] && board[1][c]==board[2][c] &&board[0][c] !=' '){
            for(let i=0;i<3;i++){
                let box=document.getElementById(i.toString() + "-" + c.toString())
                visible();
                playMusic();
                    box.classList.add("winner");
                
            }
            gameOver=true;
         
            return;
        }
    }


     //diagonally
     if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let box = document.getElementById(i.toString() + "-" + i.toString());                
            box.classList.add("winner");
            visible();
            playMusic();
        }
        gameOver = true;
       
        return;
    }

    //anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        //0-2
        let box = document.getElementById("0-2");                
        box.classList.add("winner");

        //1-1
        box = document.getElementById("1-1");                
        box.classList.add("winner");

        //2-0
       box = document.getElementById("2-0");  
       visible();  
       playMusic();            
        box.classList.add("winner");
        gameOver = true;
       
        return;
    }
}

var refresh = document.getElementById("refresh");
refresh.addEventListener("click", clear);

function clear() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
    gameOver = false;
    currPlayer = playerO;
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.classList.remove("winner");
            tile.innerText = "";
        }
    }
    hide();
}



let popup=document.querySelector('.popup');
function hide(){
    popup.classList.remove('active');
    canvas.classList.remove('active');
}
function visible(){
    popup.classList.add('active');
    canvas.classList.add('active');
   
    
}



//for celebration
let canvas=document.querySelector('#my-canvas');


var confettiSettings = { target: 'my-canvas' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();


var mySong=document.getElementById("mySong");
function playMusic(){
    mySong.play();
}