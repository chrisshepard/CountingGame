const maxTimeLimit = 20;
const initialState = "START";
const restartState = "QUIT";
const nextLevel = "Next Level";
const secondsInterval = 1000;
const dotsPerLevel = 10;
const numberofLevels = 10;
var executed = false;
var multiplier = 0;
var currentDot = 1;
var level = multiplier + 1;
var timeRemaining = maxTimeLimit;
var tCounter = document.getElementById("timer");
var pBar = document.getElementById("pBar");
var playArea = document.getElementById("playArea");
var itemUL = document.getElementById("numArea");

var game = {
    numbers: [],
    ranNumbers: [],
    startGame: function () {
        this.generateNumbers();
        this.shuffleNumbers();
        view.displayGame();
    },
    generateNumbers: function () {
        for (i = 0; i < dotsPerLevel; i++) {
            var num = (i + 1) + (multiplier * dotsPerLevel);
            this.numbers.push({
                value: num,
                verified: undefined,
            });
            if (level <= 2) {
                levels.randomLocation();
            } else if (level <= 5) {

            } else if (level <= 7) {

            } else if (level < 10) {

            } else if (level === numberofLevels) {

            };
        }

    },
    shuffleNumbers: function () {
        var nums = game.numbers;
        ranNums = game.ranNumbers;
        i = nums.length,
            j = 0;
        while (i--) {
            j = Math.floor(Math.random() * (i + 1));
            ranNums.push(nums[j]);
            nums.splice(j, 1);
        }

    },
    verifyNumber: function (position, value) {
        if ((value) == currentDot + (multiplier * dotsPerLevel)) {
            game.ranNumbers[position].verified = true;
            currentDot++;
        } else {
            game.ranNumbers[position].verified = false;
        };
    },
    resetGame: function (content) {
        game.numbers = [];
        game.ranNumbers = [];
        timeRemaining = maxTimeLimit;
        currentDot = 1;
        itemUL.innerHTML = content;
        levels.positionDots = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q"
            , "r", "s", "t"];
        levels.usedPositions = [];
    }
}

var levels = {
    positionDots: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q"
        , "r", "s", "t"],
    usedPositions: [],
    randomLocation: function () {
        var position = Math.floor(Math.random() * levels.positionDots.length);
        var x = levels.positionDots[position];
        levels.positionDots.splice(position, 1);
        levels.usedPositions.push(x);
        game.numbers[i].classCode = x
    }

}





var view = {
    dotStyles: [],
    displayGame: function () {
        view.timer();


        view.createDots();
    },
    createDots: function () {
        itemUL.innerHTML = "";
        var result = game.ranNumbers.find(function (element) {
            return element.value === parseInt(dotsPerLevel + (multiplier * dotsPerLevel));
        });
        if (result.verified === true) {
            game.resetGame("You win");
        } else {
            game.ranNumbers.forEach(function (item, position) {
                var itemLI = document.createElement("li");
                itemLI.textContent = item.value;
                itemLI.className = item.classCode;
                itemLI.id = position;

                if (item.verified === undefined) {
                    itemLI.classList.add("dot");

                } else if (item.verified === true) {
                    itemLI.classList.add("dotClicked", "correct");
                } else {
                    itemLI.classList.add("dotClicked", "wrong");
                };
                itemUL.appendChild(itemLI);

            });
        }
        playArea.appendChild(itemUL);
    },

    timer: function () {
        var timer = setInterval(myTimer, secondsInterval);
        var result = game.ranNumbers.find(function (element) {
            return element.value === parseInt(dotsPerLevel + (multiplier * dotsPerLevel));
        });

        function myTimer() {
            if (result.verified === true && timeRemaining > 0) {
                clearInterval(timer);
                pBar.className = "progress-bar progress-bar-striped progress-bar-animated bg-success";
                pBar.style.width = "100%";
                tCounter.innerHTML = maxTimeLimit;
            }
            else if (parseInt(timeRemaining) > 0 && result.verified !== true) {
                pBar.style.width = ((timeRemaining * 5) + "%");
                if ((timeRemaining * 5 >= 60)) {
                    pBar.className = "progress-bar progress-bar-striped progress-bar-animated bg-success";
                } else if ((timeRemaining * 5) > 30) {
                    pBar.className = "progress-bar progress-bar-striped progress-bar-animated bg-warning";
                } else {
                    pBar.className = "progress-bar progress-bar-striped progress-bar-animated bg-danger";
                };
                tCounter.innerHTML = timeRemaining;
                timeRemaining--;
            }

            else {
                pBar.style.width = "0%";
                tCounter.innerHTML = "0";
                clearInterval(timer);
                game.resetGame("You Lose");
            };
        }
    },
    setUpEventListeners: function () {
        var dotUL = document.querySelector('ul');

        dotUL.addEventListener('click', function (event) {
            var elementClicked = event.target;
            var value = elementClicked.innerHTML;
            var position = elementClicked.id;
            if (event.target.classList.contains("correct") === true) {
                console.log("already checked this number");
            } else {
                game.verifyNumber(position, parseInt(value));
            };
            view.createDots();
        });
    }
}

view.setUpEventListeners();





























