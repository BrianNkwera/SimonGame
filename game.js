var buttonColors = ["red","blue","green", "yellow"];//the colors present

var gamePattern = [];//random gamePattern colors
var userClickedPattern = [];//the pattern of colors the user chooses

var level = 1;
var gamePlay = false;

//starting the game
$(document).keypress(function(){
    if(!gamePlay){
    nextSequence();
    gamePlay = true;//prevents further key presses from calling the nextSequence
    }
    
});

//This Function displays the next button to be clicked in the sequence
function nextSequence(){

    userClickedPattern = [];//resets the pattern to empty on new level(when the new sequence is called)
   
    $("h1").text("level "+ level);

    //pick a random color from the buttonColors
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNumber];

    gamePattern.push(randomColor);

    $("#"+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);

    level++;
    
}

//determining the button clicked by the player
$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");//collects the id of the button clicked
    userClickedPattern.push(userChosenColor);//adds the clicked color to the userClickedPattern array

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkMate(userClickedPattern.length - 1); //calls the check mate to check if the use qualifies to continue clicking
    
});

//The checking function to check wether the choosen pattern corresponds to the random pattern
function checkMate(currentLevel){

    //checks if the last added color equals to the last color in the game pattern
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        //checks if the length of th two arrays are equal
        if(gamePattern.length === userClickedPattern.length){
                  setTimeout(function () {
                    nextSequence();
                  }, 1000);
        }
    } else{
        playSound("wrong");
        $("body").addClass("game-over");
        //function for removing the added class after 0.1 seconds
        setTimeout(function(){
    
            $("body").removeClass("game-over");
    
        }, 200);

        $("h1").text("Game Over, press any key to restart!");

        startOver();
    }
}
//this function animates the clicked button
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    //function for removing the added class after 0.1 seconds
    setTimeout(function(){

        $("#"+currentColor).removeClass("pressed");

    }, 100);
}

//this function plays respective sound of the choosen color
function playSound(color){
    var sound = new Audio('sounds/'+color+'.mp3');
    sound.play(gamePattern[0]);
}

function startOver(){
    gamePlay = false;
    level = 1;
    gamePattern = [];
}