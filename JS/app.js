var timer = document.getElementById("timer");
const maxTimeLimit = 30;
const initialState = "START";
const restartState = "QUIT";
const nextLevel = "Next Level";
const secondsInterval = 1000;
var dotsPerLevel = 10;
var multiplier = 0;
var currentDot = 1;
var numberofLevels = 10;
var numArea = document.getElementById('numArea');
var levelViewer = document.getElementById('levelViewer');
var bubbleSize = document.getElementsByClassName("dot");


function time() {
    timeLimit--;
    if (timeLimit >= 0) {
        timer.innerHTML = timeLimit;
    } else {
        numArea.innerHTML = "Try Again!";
        clearInterval(timerStart);
    }
}

function setTimeLimit() {
    timer.innerHTML = maxTimeLimit;
}

var game = {
    numberArray: [],
    ranNums: [],
    startGame: function () {
        if (playButton.innerHTML === initialState) {
            this.clearArrays();
            levelViewer.innerHTML = "";
            numArea.innerHTML = "";
            multiplier = 0;
            currentDot = 1;
            playButton.innerHTML = restartState;
            this.viewSquence();
        } else if (playButton.innerHTML === restartState) {
            playButton.innerHTML = initialState;
            levelViewer.innerHTML = "";
            clearInterval(timerStart);
            setTimeLimit();
            numArea.innerHTML = "<p>Click the numbers from lowest to highest. <br> Count to 100 to Complete the Game!</p>";
        } else if (playButton.innerHTML === nextLevel) {
            numArea.innerHTML = "";
            currentDot = 1;
            multiplier++;
            playButton.innerHTML = restartState;
            this.viewSquence();
        } else {
            levelViewer.innerHTML = "";
            playButton.innerHTML = initialState;
        }
    },
    viewSquence: function () {
        view.levelViewer();
        view.startTimer();
        view.createDots();
    },
    fillDots: function () {
        for (var i = 0; i < 10; i++) {
            var num = (i + 1) + (multiplier * dotsPerLevel);
            game.numberArray.push(num);

        }
    },
    shuffleDots: function () {

        var nums = this.numberArray;
        ranNums = this.ranNums;
        i = nums.length,
            j = 0;

        while (i--) {
            j = Math.floor(Math.random() * (i + 1));
            ranNums.push(nums[j]);
            nums.splice(j, 1);
        }

    },
    clearArrays: function () {
        this.numberArray = [];
        this.ranNums = [];
    }
};

var handler = {
    startGame: function () {
        game.startGame();
    },
}

var view = {
    createDots: function () {
        game.fillDots();
        game.shuffleDots();

        for (var i = 0; i < 10; i++) {
            var number = game.ranNums[i];
            var bubble = document.createElement('span');
            bubble.className = "dot";
            bubble.id = "bubble" + number;
            bubble.innerHTML = number + (multiplier * dotsPerLevel);
            bubble.onclick = this.verifyNum;
            numArea.append(bubble);
        }
    },
    startTimer: function () {
        timer.innerHTML = maxTimeLimit;
        timeLimit = maxTimeLimit;
        timerStart = setInterval(time, secondsInterval);
        timeLimit = maxTimeLimit;
    },
    levelViewer: function () {
        var level = document.createElement("div");
        levelViewer.innerHTML = " ";
        level.className = "level";
        level.innerHTML = "Level " + (multiplier + 1);
        levelViewer.append(level);
    },
    verifyNum: function (element) {
        if (currentDot + (multiplier * dotsPerLevel) == element.srcElement.innerHTML) {
            element.srcElement.className = "correct dot";
            if (currentDot === dotsPerLevel && timer.innerHTML !== "0") {
                numArea.innerHTML = "You Won!";
                clearInterval(timerStart);
                if (multiplier == (numberofLevels - 1)) {
                    numArea.innerHTML = "You counted to 100! Great Job.";
                    levelViewer.innerHTML = "";
                    playButton.innerHTML = "Play Again";
                } else {
                    playButton.innerHTML = nextLevel;
                }
            }
            currentDot++;
        } else {
            if (element.srcElement.className !== "correct dot") {
                element.srcElement.className = "wrong dot";
            }
        }
    }
}