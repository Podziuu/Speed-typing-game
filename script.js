const API_LINK = 'http://api.quotable.io/random';

const quoteDisplay = document.querySelector('.quote');
const answer = document.querySelector('.answer');
const timer = document.querySelector('.timer')

let isTime = false;

answer.addEventListener('input', () => {
    arrayQuote = document.querySelectorAll('span');
    arrayValue = answer.value.split('');


    if(answer.value.length === 1) {
        isTime = true;
        startTimer()
    } else if(answer.value.length === 0) {
        isTime = false;
        startTimer()
    }

    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if(character == null) {
            characterSpan.classList.remove('incorrect')
            characterSpan.classList.remove('correct')
            correct = false;
        } else if(character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct')
            correct = false;
        }
    })
    if(correct) renderQuote();
})


function getQuote() {
    return fetch(API_LINK)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderQuote() {
    const quote = await getQuote()
    quoteDisplay.innerHTML = '';
    answer.value = '';
    isTime = false;
    quote.split('').forEach(character => {
        const span = document.createElement('span');
        span.innerHTML = character;
        quoteDisplay.appendChild(span);
    })
    startTimer()
}

let startTime
function startTimer() {
    console.log(isTime);
    timer.innerText = 0
    startTime = new Date();
    setInterval(() => {
        if(isTime) {
            timer.innerHTML = getTime()
        }
    }, 1000)
}

function getTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

startTimer()
renderQuote()