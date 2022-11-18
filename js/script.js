'use strict';

const hero = document.getElementById('hero');
const hanger = document.getElementsByClassName('hanger');
const mannequin = document.getElementsByClassName('mannequin');
const table = document.getElementsByClassName('table');
const reward = document.getElementById('reward');
const text = document.getElementById('newGameText');
const grayScreen = document.getElementById('newGame');
const winScreen = document.getElementById('win');
const rotateCircle = document.getElementById('circle');

let stop = false;
let move = false;


const begin = () => {
    move = true;

    let start = Date.now();

    let timerHandler = () => {
        let timePassed = Date.now() - start;

        if (timePassed >= 3900 || crushing()) {
            clearInterval(timer);

            setTimeout(() => {
               hero.style.left = '0px';
            }, 300);

            hero.classList.remove('jump');
            hero.classList.remove('animWalk');
            hero.classList.add('heroFlash');
            //

            setTimeout(() => {
                hero.classList.remove('heroFlash');
            }, 300);

            stop = true;
            move = false;

            return;
        }

        draw(timePassed);
    }

    let timer = setInterval(timerHandler, 5);

    let draw = (timePassed) => {
        hero.style.left = timePassed / 3 + 'px';

        if (getCoords(hero).right > 1388) {
            win();
            winScreen.style.opacity = '100%';
        }
    }
}

const jump = () => {
    hero.classList.remove('animWalk');
    if (hero.classList !== 'jump') {
        hero.classList.add('jump');
    //
    }

    setTimeout(() => {
        hero.classList.remove('jump');
    }, 600);
}

const walk = () => {
    if (hero.classList === 'jump' || hero.classList === 'heroFlash') {
        hero.classList.remove('animWalk');
    }

    if (move === true && hero.classList !== 'jump' && hero.classList !== 'heroFlash' && hero.classList !== 'animWalk') {
        hero.classList.add('animWalk');
    }
}

text.classList.add('flash');


document.addEventListener('keydown', (event) => {
    if (!crushing() && move === true) {
        jump();
    }
    setTimeout(() => {
        walk();
    }, 600)
});

document.addEventListener('click', (event) => {
    text.remove();
    grayScreen.classList.add('opacity');
    setTimeout(() => {
        grayScreen.remove();
    }, 300);
    begin();
}, {once: true});

document.addEventListener('click', (event) => {
    if (stop === true) {
    begin();
    stop = false
    }
    walk();
});


const getCoords = (elem) => {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + window.pageYOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
}

const crushing = () => {
    for (let i = 0; i < 3; i++) {
        if (getCoords(hero).right > getCoords(mannequin[i]).left && getCoords(hero).bottom > getCoords(mannequin[i]).top &&
            getCoords(hero).left < getCoords(mannequin[i]).right) {
            return true
        }
    }

    for (let i = 0; i < 1; i++) {
        if (getCoords(hero).right > getCoords(table[i]).left && getCoords(hero).bottom > getCoords(table[i]).top &&
            getCoords(hero).left < getCoords(table[i]).right) {
            return true
        }
    }

    for (let i = 0; i < 2; i++) {
        if (getCoords(hero).right > getCoords(hanger[i]).left && getCoords(hero).top < getCoords(hanger[i]).bottom &&
            getCoords(hero).left < getCoords(hanger[i]).right) {
            return true
        }
    }
}

const win = () => {
    winScreen.classList.add('winAnim');
    rotateCircle.classList.add('rotation');
}













