var buttonColors=["red", "blue", "green", "yellow"];

var gamePattern=[];

var userClickedPattern=[];

var started = false;

var level = 0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () { 
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);

});


function nextSequence() {
    level++;
    $("#level-title").text("level " + level);
    randomNumber=Math.floor(Math.random()*3+1);
    var randomChoosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColor);   
}

function playSound(name) {
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();    
}

function animatePress(currentColor) {
        $("#"+currentColor).addClass("pressed");
        setTimeout(function(){
            $("#"+currentColor).removeClass("pressed");
        }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];   
    started = false;
}


