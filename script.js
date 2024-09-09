let ANSWER = generateNumbers(); // 정답 숫자
let tries = 0; // 시도 횟수

function generateNumbers() {
    let numbers = [];
    while (numbers.length < 3) {
        let num = Math.floor(Math.random() * 10);
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
}

function changeNumber(id, delta) {
    let input = document.getElementById(id);
    let currentValue = parseInt(input.value);
    let newValue = currentValue + delta;

    if (newValue >= 0 && newValue <= 9) {
        input.value = newValue;
    }
}

function submitGuess() {
    let num1 = parseInt(document.getElementById('num1').value);
    let num2 = parseInt(document.getElementById('num2').value);
    let num3 = parseInt(document.getElementById('num3').value);

    if ([num1, num2, num3].some(num => num < 0 || num > 9)) {
        alert('숫자는 0과 9 사이여야 합니다.');
        return;
    }

    if (new Set([num1, num2, num3]).size !== 3) {
        alert('중복된 숫자는 허용되지 않습니다.');
        return;
    }

    let guess = [num1, num2, num3];
    let [strikes, balls] = getScore(guess, ANSWER);
    tries++;

    if (strikes === 3) {
        document.getElementById('result').innerText = '정답입니다!';
        document.getElementById('attempts').innerText = `시도 횟수: ${tries}`;
        document.getElementById('num1').disabled = true;
        document.getElementById('num2').disabled = true;
        document.getElementById('num3').disabled = true;
        return;
    }

    document.getElementById('result').innerText = `${strikes}S ${balls}B`;
    document.getElementById('attempts').innerText = `시도 횟수: ${tries}`;
}

function getScore(guess, solution) {
    let strikeCount = 0;
    let ballCount = 0;

    for (let i = 0; i < 3; i++) {
        if (guess[i] === solution[i]) {
            strikeCount++;
        } else if (solution.includes(guess[i])) {
            ballCount++;
        }
    }

    return [strikeCount, ballCount];
}
