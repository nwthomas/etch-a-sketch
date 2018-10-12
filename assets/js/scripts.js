const buttons = document.querySelectorAll("input");
const container = document.querySelector(".container");
const allDivs = container.querySelectorAll("div");
let arrayBtnResponse = { 
    newBtn: 0,
    blackBtn: "n",
    colorBtn: "y",
};

// sets color palette to black/monochromatic
function makeBlack() {
    arrayBtnResponse.blackBtn = "y";
    arrayBtnResponse.colorBtn = "n";
    createColorSensitivity();
}

// sets color palette to vibrant colors, randomly generated
function makeColor() {
    arrayBtnResponse.colorBtn = "y";
    arrayBtnResponse.blackBtn = "n";
    createColorSensitivity();
}

// color palettes
function applyColors(color) {
    if (arrayBtnResponse.blackBtn == "y") {
        return "rgb(0, 0, 0)"
    }
    if (arrayBtnResponse.colorBtn == "y") {
        let randomNum = Math.random();
        if (randomNum <= 0.08) {
            return "rgb(203, 223, 127)";
        } else if (randomNum <= 0.16) {
            return "rgb(156, 194, 119)";
        } else if (randomNum <= 0.25) {
            return "rgb(64, 123, 124)";
        } else if (randomNum <= 0.33) {
            return "rgb(33, 52, 76)";
        }  else if (randomNum <= 0.42) {
            return "rgb(214, 228, 151)";
        } else if (randomNum <= 0.5) {
            return "rgb(175, 207, 144)";
        } else if (randomNum <= 0.59) {
            return "rgb(98, 149, 151)";
        } else if (randomNum <= 0.67) {
            return "rgb(76, 93, 110)";
        } else if (randomNum <= 0.76) {
            return "rgb(224, 235, 176)";
        } else if (randomNum <= 0.85) {
            return "rgb(195, 218, 173)";
        } else if (randomNum <= 0.93) {
            return "rgb(136, 176, 177)";
        } else {
            return "rgb(122, 133, 147)";
        }
    }
}

// assigns event listeners for application of colors to each div
function createColorSensitivity() {
    for (i = 1; i <= (arrayBtnResponse.newBtn * arrayBtnResponse.newBtn); i++) {
        let id = document.getElementById("r" + i);
        id.addEventListener("mouseover", () => {
            let thisDivColor = id.style.backgroundColor;
            id.style.backgroundColor = applyColors(thisDivColor);
        });
    }
}

// resets all divs in canvas to white color
function resetCanvas() {
    let divCountSquared = parseInt(arrayBtnResponse.newBtn) * parseInt(arrayBtnResponse.newBtn);
    for (i = 1; i <= divCountSquared; i++) {
        let divToReset = document.getElementById( "r" + i );
        divToReset.style.backgroundColor = "rgb(255, 255, 255)";
    }
}

// prompts user for grid width/height and checks to see if a grid is already in place
function getCanvasSize() {
    if (arrayBtnResponse.newBtn < 10 || arrayBtnResponse.newBtn > 100) {
        let userResponse = prompt("Please enter a square width between 10 and 100:", "");
        let userNum = parseInt(userResponse);
        arrayBtnResponse.newBtn = userNum;
        if (userNum > 100 || userNum < 10) { 
            getCanvasSize(); 
        }
        if (isNaN(userNum) === true) { 
            getCanvasSize(); 
        }
        if (userNum <= 100 && userNum >= 10) { 
            makeCanvas(); 
        }
    } else {
        let divCountSquared = parseInt(arrayBtnResponse.newBtn) * parseInt(arrayBtnResponse.newBtn);
        for (i = 1; i <= divCountSquared; i++) {
            var thisDiv = document.getElementById( "r" + i );
            thisDiv.parentNode.removeChild(thisDiv);
        }
        arrayBtnResponse.newBtn = 0;
        getCanvasSize();
    }   
}

// creates grid columns/rows for divs
function setGrid() {
    let divCount = parseInt(arrayBtnResponse.newBtn);
    let divHeightWidth = (600 / divCount);

    for (i = 1; i <= arrayBtnResponse.newBtn; i++) {
        container.style.gridTemplateColumns = `repeat(${(divCount)}, ${(divHeightWidth)}px`
        container.style.gridTemplateRows = `repeat(${(divCount)}, ${(divHeightWidth)}px`;
    }
}

// creates divs of exact height/width and places them in the container
function makeCanvas() {
    let divCountSquared = parseInt(arrayBtnResponse.newBtn) * parseInt(arrayBtnResponse.newBtn);
    let divCount = parseInt(arrayBtnResponse.newBtn);
    let divHeightWidth = (600 / divCount);
    setGrid();
    for (i = 1; i <= divCountSquared; i++) {
        let newDiv = document.createElement("div");
        newDiv.id = "r" + i;

        newDiv.classList.add("new-divs", "divs-color");
        container.appendChild(newDiv);
        newDiv.style.height = `${(divHeightWidth)}px`;
        newDiv.style.width = `${(divHeightWidth)}px`;
        newDiv.style.backgroundColor = "rgb(255, 255, 255)";
    }
    createColorSensitivity();
}

// assigns event listeners to each button on screen
buttons.forEach((input) => {
    input.addEventListener("click", () => {
        if (input.value == "New") {
            getCanvasSize()
        };
        if (input.value == "Black") {
            makeBlack()
        };
        if (input.value == "Color") {
            makeColor()
        };
        if (input.value == "Reset") {
            resetCanvas()
        };
    });
});