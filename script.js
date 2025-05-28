function random(limit) {
    return Math.floor(Math.random() * limit);
}

let currentDimension = 16;
let currentSpace = 800;
let currentSquareDimension = currentSpace  / currentDimension;

let isHovering = false;

function createGridSquare(dimension, space, squareDimension) {
    const container = document.querySelector('div.container');
    container.style.width = `${space}px`;
    container.style.height = `${space}px`;
    
    for(let i = 0; i < dimension; i++) {
        let divTagLine = document.createElement('div');
        divTagLine.classList.add('line');
        for(let j = 0; j < dimension; j++) {
            let divTagSquare = document.createElement('div');
            let divTagSquareIn = document.createElement('div');

            divTagSquare.style.width = `${squareDimension}px`;
            divTagSquare.style.height = `${squareDimension}px`;
            divTagSquareIn.style.width = `${squareDimension}px`;
            divTagSquareIn.style.height = `${squareDimension}px`;

            divTagSquare.classList.add('Square');
            divTagSquareIn.classList.add('square');
            divTagSquare.appendChild(divTagSquareIn);
            divTagLine.appendChild(divTagSquare);
        }
        container.appendChild(divTagLine);
    }
}

createGridSquare(currentDimension, currentSpace, currentSquareDimension);

let allSquare = document.querySelectorAll('div.square');

let isClicked = false;
let isDblClicked = false;

allSquare.forEach(square => {
    square.addEventListener('mouseover', (e) => {
        if(isDblClicked === false) {
            isHovering = true;
            let opacityValue = getComputedStyle(e.target).opacity;
            if(Number(opacityValue) !== 0) {
                e.target.style.opacity = `${Number(opacityValue) - 0.1}`;
            }
            e.target.style.backgroundColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
            e.target.style.width = `${currentSquareDimension - (currentSquareDimension * 0.2)}px`;
            e.target.style.height = `${currentSquareDimension - (currentSquareDimension * 0.2)}px`;
        }
    })
})

allSquare.forEach(square => {
    square.addEventListener('mouseout', (e) => {
        if(isDblClicked === false) {
            if(isClicked === false) {
                e.target.style.width = `${currentSquareDimension}px`;
                e.target.style.height = `${currentSquareDimension}px`;
            }
            else {
                isClicked = false;
            }
        }
    })
})

allSquare.forEach(square => {
    square.addEventListener('click', (e) => {
        if(isDblClicked === false) {
            isClicked = true;
            e.target.style.backgroundColor = 'white';
            e.target.style.opacity = '1';
            e.target.style.width = `${currentSquareDimension}px`;
            e.target.style.height = `${currentSquareDimension}px`;
        }
    })
})

allSquare.forEach(square => {
    square.addEventListener('dblclick', (e) => {
        isDblClicked = !isDblClicked;
    })
})

// relancement

const buttonValid = document.querySelector('#valid');
buttonValid.addEventListener('click', (e) => {
    const newDimension = document.querySelector('#dimension').value;
    document.querySelector('#dimension').value = '';
    if(newDimension > 0 && newDimension <= 100 && newDimension != currentDimension) {
        const textDim = document.querySelector('.textDim');
        textDim.textContent = `${newDimension} x ${newDimension}`;
        isDblClicked = false;
        const lines = document.querySelectorAll('div.line');
        lines.forEach(line => {
            line.remove();
        })
        currentDimension = newDimension;
        currentSquareDimension = currentSpace / currentDimension;

        createGridSquare(currentDimension, currentSpace, currentSquareDimension);

        allSquare = document.querySelectorAll('div.square');
        
        allSquare.forEach(square => {
            square.addEventListener('mouseover', (e) => {
                if(isDblClicked === false) {
                    isHovering = true;
                    let opacityValue = getComputedStyle(e.target).opacity;
                    if(Number(opacityValue) !== 0) {
                        e.target.style.opacity = `${Number(opacityValue) - 0.1}`;
                    }
                    e.target.style.backgroundColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
                    e.target.style.width = `${currentSquareDimension - (currentSquareDimension * 0.2)}px`;
                    e.target.style.height = `${currentSquareDimension - (currentSquareDimension * 0.2)}px`;
                }
            })
        })

        allSquare.forEach(square => {
            square.addEventListener('mouseout', (e) => {
                if(isDblClicked === false) {
                    if(isClicked === false) {
                        e.target.style.width = `${currentSquareDimension}px`;
                        e.target.style.height = `${currentSquareDimension}px`;
                    }
                    else {
                        isClicked = false;
                    }
                }
            })
        })

        allSquare.forEach(square => {
            square.addEventListener('click', (e) => {
                if(isDblClicked === false) {
                    isClicked = true;
                    e.target.style.backgroundColor = 'white';
                    e.target.style.opacity = '1';
                    e.target.style.width = `${currentSquareDimension}px`;
                    e.target.style.height = `${currentSquareDimension}px`;
                }
            })
        })

        allSquare.forEach(square => {
            square.addEventListener('dblclick', (e) => {
                isDblClicked = !isDblClicked;
            })
        })

    }
})

const eraseButton = document.querySelector('.tools button');

eraseButton.addEventListener('click', () => {
    if(isHovering == true) {
        allSquare.forEach(square => {
            square.style.backgroundColor = 'white';
            square.style.opacity = '1';
        });
        isHovering = false;
    }
})

eraseButton.addEventListener('mouseover', () => {
    const text = document.querySelector('.tools button span');
    text.style.display = 'inline';
});

eraseButton.addEventListener('mouseout', () => {
    const text = document.querySelector('.tools button span');
    text.style.display = 'none';
});