
const pixels = document.getElementById('pixelCanvas');
const tr = document.querySelector('tr');
const td = document.querySelector('td');
const chosenColorFree = document.querySelector('.color-picker-free');
const colorPickerBox = document.querySelector('.color-picker-box');

let chosenColor = '#000000';
let positionMouseX;
let positionMouseY;
let mouseState = false;
let widthOflViewport = window.innerWidth;
let heightOfViewport = window.innerHeight;
let widthOfPixel = widthOflViewport / 100;
let cantidadFilas = Math.trunc(heightOfViewport / widthOfPixel);




const makePixels = () => {
    pixels.innerHTML = "";
    for (let i = 0; i < cantidadFilas; i++) {
        const row = pixels.insertRow(0);
        document.querySelector('tr').style.setProperty("height", `${widthOfPixel}px`);
        for (let j = 0; j < 100; j++) {
            row.insertCell(0);
            document.querySelector('td').style.setProperty("width", `${widthOfPixel}px`);
        }
    }
}

makePixels();

window.addEventListener("resize", () => {
    widthOflViewport = window.innerWidth;
    heightOfViewport = window.innerHeight;
    widthOfPixel = widthOflViewport / 100;
    cantidadFilas = Math.trunc(heightOfViewport / widthOfPixel);
    makePixels();
})


pixels.addEventListener('mousedown', x => {

    switch (x.button) {
        case 0:
            mouseState = true;
            break;
        case 2:
            document.oncontextmenu = new Function("return false");
            document.querySelector('.draggable').style.setProperty("display", 'block');
            document.querySelector('.draggable').style.setProperty("left", `${positionMouseX}px`);
            document.querySelector('.draggable').style.setProperty("top", `${positionMouseY}px`);
            break;
        default:
            break;
    }

    paint(x);

});


const paint = (x) => {
    if (mouseState === true) {
        if (x.target.nodeName === 'TD') { x.target.style.backgroundColor = chosenColor; }
        if (mouseState === true) {
            pixels.addEventListener('mouseover', (x) => {
                if (x.target.nodeName === 'TD' && mouseState === true) {
                    x.target.style.backgroundColor = chosenColor;
                }
            });
        }
    }
}

pixels.addEventListener('mouseup', e => mouseState = false);
pixels.addEventListener('mouseleave', e => mouseState = false);

colorPickerBox.addEventListener('click', (e) => {

    if (e.target.value !== undefined) {
        switch (e.target.value) {
            case 1:
                chosenColor = '#FF0000';
                break;
            case 2:
                chosenColor = '#00FF00';
                break;
            case 3:
                chosenColor = '#0000FF';
                break;
            case 4:
                chosenColor = '#ffffff';
                break;
            case 5:
                chosenColor = '#000000';
                break;
            case 6:
                chosenColor = chosenColor;
                break;
            default:
                break;
        }
    }
});


chosenColorFree.addEventListener('change', e => chosenColor = chosenColorFree.value);

document.addEventListener("mousemove", (e) => {
    positionMouseX = e.clientX;
    positionMouseY = e.clientY;
});

const hideDiv = () => { document.querySelector('.draggable').style.setProperty("display", 'none'); }

document.querySelector('.draggable').onmouseleave = hideDiv;

(function () {
    let
        oActive, nMouseX, nMouseY, nStartX, nStartY,
        bMouseUp = true, nZFocus = /* the highest z-Index present in your page plus 1: */ 100;

    document.onmousedown = function (oPssEvt1) {
        var bExit = true, oMsEvent1 = oPssEvt1 || /* IE */ window.event;
        for (let iNode = oMsEvent1.target; iNode; iNode = iNode.parentNode) {
            if (iNode.className === "draggable") { bExit = false; oActive = iNode; break; }
        }
        if (bExit) { return; }
        bMouseUp = false;
        nStartX = nStartY = 0;
        for (let iOffPar = oActive; iOffPar; iOffPar = iOffPar.offsetParent) {
            nStartX += iOffPar.offsetLeft;
            nStartY += iOffPar.offsetTop;
        }
        nMouseX = oMsEvent1.clientX;
        nMouseY = oMsEvent1.clientY;
        oActive.style.zIndex = nZFocus++;
        return false;
    };

    document.onmousemove = function (oPssEvt2) {
        if (bMouseUp) { return; }
        let oMsEvent2 = oPssEvt2 || /* IE */ window.event;
        oActive.style.left = String(nStartX + oMsEvent2.clientX - nMouseX) + "px";
        oActive.style.top = String(nStartY + oMsEvent2.clientY - nMouseY) + "px";
    };

    document.onmouseup = function () {
        bMouseUp = true;
    };
})();







