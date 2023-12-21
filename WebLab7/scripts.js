const playButton = document.getElementById('play');
const startButton = document.getElementById('start');
const reloadButton = document.getElementById('reload');
const closeButton = document.getElementById('close');
const userConsole = document.getElementById('consoleout');

const workArea = document.getElementById('work');
const animArea = document.getElementById('anim');

var circle1;
var circle2;

let ballsdistance = 0;
let moveStep = 1;
let lognumber = 1;
var fastsavefirst = true;

let direction1 = [-3, 3];
let direction2 = [3, -3];

// this function is used to sernd messgae to server, with out localstorage
function fastPullSave(message) {
    if (fastsavefirst) {
        fastsavefirst = false;
    }
    fetch('fastPullSave.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
    })
        .then(response => response.text())
        .then(data => { })
        .catch(error => console.error('Error:', error));
}

function createNewLog(message) {
    let now = new Date();
    let localDateTime = now.toLocaleString();
    var newLog = { key: lognumber, action: message, time: localDateTime };
    console.log(newLog);
    return newLog;
}

function userlog(message) {
    var constempvar = userConsole.textContent;
    var tempstr = `${lognumber}.${message}\n` + constempvar;
    userConsole.textContent = tempstr;

    var existingData = localStorage.getItem('userLogs');
    var logs = existingData ? JSON.parse(existingData) : [];

    var newLog = createNewLog(message);
    logs.push(newLog);

    localStorage.setItem('userLogs', JSON.stringify(logs));

    fastPullSave(newLog);

    lognumber += 1;
}

// Функція для відправки даних на сервер
function onePullSave() {
    const storedData = localStorage.getItem('userLogs');

    fetch('onePullSave.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: storedData
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            localStorage.clear(); 
        })
        .catch(error => console.error('Error:', error));
}

function createCircle(id, color) {

    let circle = document.getElementById(id);

    if (!circle) {
        circle = document.createElement('div');
        circle.id = id;
        circle.style.position = 'absolute';
        circle.style.borderRadius = '50%'; 
        circle.style.width = `${20}px`;
        circle.style.height = `${20}px`;
        circle.style.backgroundColor = color;
        animArea.appendChild(circle);
    }

    const maxX = animArea.clientWidth - 20;
    const maxY = animArea.clientHeight - 20;
    const startX = Math.floor(Math.random() * maxX);
    const startY = Math.floor(Math.random() * maxY);
    circle.style.left = `${startX}px`;
    circle.style.top = `${startY}px`;

    return circle;
}

function moveCircle(circle, dx, dy) {
    const currentLeft = parseInt(circle.style.left, 10);
    const currentTop = parseInt(circle.style.top, 10);
    const newLeft = currentLeft + dx;
    const newTop = currentTop + dy;
    var circlecolour = circle.style.backgroundColor;
    // Check for wall collisions
    const rightEdge = animArea.clientWidth - 20;
    const bottomEdge = animArea.clientHeight - 20;

    if (newLeft < 0 || newLeft > rightEdge) {
        dx = -dx;
        if (circlecolour == 'yellow') {
            userlog('Yellow ball toched right or left wall.');
        }
        else {
            userlog('Red ball toched right or left wall.');
        }
    }
    if (newTop < 0 || newTop > bottomEdge) {
        dy = -dy;
        if (circlecolour == 'yellow') {
            userlog('Yellow ball toched top or bottom wall.');
        }
        else {
            userlog('Red ball toched top or bottom wall.');
        }
    }

    circle.style.left = `${newLeft}px`;
    circle.style.top = `${newTop}px`;

    return [dx, dy];
}

// Animation function
function animate() {
    direction1 = moveCircle(circle1, ...direction1);
    direction2 = moveCircle(circle2, ...direction2);
    ballsdistance += 1;
    if (ballsdistance % 100 === 0) {
        userlog('Distance balls traveled: ' + ballsdistance);
    }
    // Check for collision between circles
    const circle1Rect = circle1.getBoundingClientRect();
    const circle2Rect = circle2.getBoundingClientRect();

    const collision = (circle1Rect.right < circle2Rect.left ||
        circle1Rect.left > circle2Rect.right ||
        circle1Rect.bottom < circle2Rect.top ||
        circle1Rect.top > circle2Rect.bottom);

    if (collision) {
        requestAnimationFrame(animate);
    }
    else {
        userlog('Collision detected.');
        userlog('Balls have treveled ' + ballsdistance + ' pixels in total.');
        startButton.disabled = false;
    }
}

playButton.addEventListener('click', function () {
    fetch('servefastsave.php', { method: 'POST' })
        .then(response => response.text())
        .then(data => console.log('Data was cleared from fast save file.'))
        .catch(error => console.error('Error:', error));

    workArea.style.display = 'inline';
    startButton.style.display = 'inline';
    closeButton.style.display = 'inline';
    this.style.display = 'none'; 
    userlog('Play button clicked.');
});

startButton.addEventListener('click', function () {
    this.disabled = true;
    circle1 = createCircle('circle1', 'yellow');
    circle2 = createCircle('circle2', 'red');
    animate(); // Start the animation
    userlog('Start button clicked.');
});

closeButton.addEventListener('click', function () {
    lognumber = 1;
    workArea.style.display = 'none';
    playButton.style.display = 'inline';
    this.style.display = 'none'; 
    onePullSave();
});