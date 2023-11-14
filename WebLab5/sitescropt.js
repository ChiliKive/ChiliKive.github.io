
document.addEventListener("DOMContentLoaded", function () {
    // first task
    var block1 = document.getElementById("firstBlockText");
    var block2 = document.getElementById("secondBlockText");
    var text1 = block1.textContent;
    var text2 = block2.textContent;
    block1.textContent = text2;
    block2.textContent = text1;

    // second task
    var minrad = 5;
    var maxrad = 4;
    var answer = minrad * maxrad * 3.141;
    var block3penanswer = document.getElementById("ellipseSquareAnswer");
    var minradText = document.getElementById("ellipseMinrad");
    var maxradText = document.getElementById("ellipseMaxrad");
    block3penanswer.textContent = answer;
    minradText.textContent = maxrad;
    maxradText.textContent = minrad;
});

// third task
function FindDivisors() {
    const mainNum = parseFloat(document.getElementById("numForSearch").value);

    let divisors = [];

    for (let i = 1; i <= mainNum; i++) {
        if (mainNum % i === 0) {
            divisors.push(i);
        }
    }

    alert(`Дільники числа ${mainNum}: ${divisors.join(', ')}`);

    const divisorsData = {
        mainNum,
        divisors
    };
    document.cookie = `divisorsData=${JSON.stringify(divisorsData)}`;

    document.getElementById("devideform").reset();
}

function checkAndDisplayCookieInfo() {
    const cookies = document.cookie;

    if (cookies.includes("divisorsData")) {
        const storedData = JSON.parse(cookies.split("divisorsData=")[1].split(";")[0]);
        alert("Збережені дані з cookies: " + JSON.stringify(storedData));

        const confirmDelete = confirm("Знайдені дані в cookies. Бажаєте видалити?");

        if (confirmDelete) {
            document.cookie = "divisorsData=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            alert("Дані видалено. Будь ласка, перезавантажте сторінку.");
            location.reload();
        } else {
            const reloadConfirmation = confirm("Бажаєте перезавантажити сторінку?");
            if (reloadConfirmation) {
                location.reload();
            }
        }
    }
}

document.getElementById("FindDivisorsButton").addEventListener("click", FindDivisors);
document.addEventListener("DOMContentLoaded", checkAndDisplayCookieInfo);

// 4th task
const block1 = document.getElementById('firstBlockTextDiv');
const block2 = document.getElementById('secondBlockTextDiv');

const checkboxBlock1 = document.getElementById('checkboxBlock1');
const checkboxBlock2 = document.getElementById('checkboxBlock2');

block1.addEventListener('mouseover', function () {
    if (checkboxBlock1.checked) {
        block1.style.textAlign = 'right';
    }
});

block2.addEventListener('mouseover', function () {
    if (checkboxBlock2.checked) {
        block2.style.textAlign = 'right';
    }
});

block1.addEventListener('mouseout', function () {
    block1.style.textAlign = '';
});

block2.addEventListener('mouseout', function () {
    block2.style.textAlign = '';
});

const alignBlock1 = localStorage.getItem('alignBlock1');
const alignBlock2 = localStorage.getItem('alignBlock2');

if (alignBlock1 === 'right') {
    checkboxBlock1.checked = true;
    localStorage.setItem('alignBlock1', 'right');
}

if (alignBlock2 === 'right') {
    checkboxBlock2.checked = true;
    localStorage.setItem('alignBlock2', 'right');
}

checkboxBlock1.addEventListener('change', function () {
    if (checkboxBlock1.checked) {
        localStorage.setItem('alignBlock1', 'right');
    } else {
        block1.style.textAlign = '';
        localStorage.removeItem('alignBlock1');
    }
});

checkboxBlock2.addEventListener('change', function () {
    if (checkboxBlock2.checked) {
        localStorage.setItem('alignBlock2', 'right');
    } else {
        block2.style.textAlign = '';
        localStorage.removeItem('alignBlock2');
    }
});

// task 5
function createList(blockNumber) {
    const list = document.createElement('ul');
    let itemCount = parseInt(prompt('Введіть кількість пунктів списку:'));

    while (!isNaN(itemCount) && itemCount > 0) {
        const listItem = document.createElement('li');
        listItem.textContent = prompt(`Введіть текст для пункту ${list.children.length + 1}:`);
        list.appendChild(listItem);

        itemCount--;
    }

    const block = document.getElementById(`block${blockNumber}`);
    block.appendChild(list);
}

function saveList() {
    const blocks = document.querySelectorAll('div[id^="block"]');
    const data = {};

    blocks.forEach((block, index) => {
        const list = block.querySelector('ul');
        if (list) {
            const items = Array.from(list.children).map(item => item.textContent);
            data[`block${index + 1}`] = items;
        }
    });

    localStorage.setItem('unnumberedList', JSON.stringify(data));
    alert('Список збережено в localStorage.');
}

function clearList() {
    localStorage.removeItem('unnumberedList');
    alert('Дані списку видалено з localStorage.');
    location.reload();
}

const savedData = localStorage.getItem('unnumberedList');

if (savedData) {
    const parsedData = JSON.parse(savedData);

    Object.keys(parsedData).forEach(key => {
        const block = document.getElementById(key);
        const list = document.createElement('ul');

        parsedData[key].forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            list.appendChild(listItem);
        });

        block.appendChild(list);
    });
}