/*

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
  return Math.ceil(Math.random() * 100);
}

function shuffle(arr) {
  let remaining = arr.length,
    current,
    randomPick;

  while (remaining) {
    randomPick = Math.floor(Math.random() * remaining--);

    current = arr[remaining];
    arr[remaining] = arr[randomPick];
    arr[randomPick] = current;
  }

  return arr;
}

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }

  difference() {
    return Math.abs(this.winningNumber - this.playersGuess);
  }

  isLower() {
    return this.playersGuess < this.winningNumber;
  }

  playersGuessSubmission(num) {
    if (num < 1 || num > 100 || num === NaN) {
      throw "That's an invalid guess. Try again!";
    } else {
      this.playersGuess = num;
      return this.checkGuess();
    }
  }

  checkGuess() {
    if (this.playersGuess === this.winningNumber) {
      return 'You win!';
    } else if (this.pastGuesses.includes(this.playersGuess)) {
      return 'You have already guessed that number.';
    } else {
      this.pastGuesses.push(this.playersGuess);
      if (this.pastGuesses.length < 5) {
        let message =
          this.difference() < 10
            ? `You're burning up!`
            : this.difference() < 25
            ? `You're lukewarm.`
            : this.difference() < 50
            ? `You're a bit chilly.`
            : `You're ice cold!`;
        if (this.winningNumber - this.playersGuess < 0) {
          message += ' Guess lower!';
        } else {
          message += ' Guess higher!';
        }
        return message;
      } else {
        return `You Lose. The winning number was ${this.winningNumber}.`;
      }
    }
  }

  provideHint() {
    let hintArr = [
      this.winningNumber,
      generateWinningNumber(),
      generateWinningNumber(),
    ];
    return shuffle(hintArr);
  }
}

function newGame() {
  return new Game();
}

const submitButton = document.getElementById('submit-btn');
const restartButton = document.getElementById('new-game-btn');
const hintButton = document.getElementById('hint-btn');

let game = newGame();
let guesses = 0;
let prevGuesses = document.querySelector('.prev-guesses');
let first = document.querySelector('#first');
let second = document.querySelector('#second');
let third = document.querySelector('#third');
let fourth = document.querySelector('#fourth');
let fifth = document.querySelector('#fifth');
let feedbackMessage = document.querySelector('#feedback');
let warning = document.querySelector('#warning');
let hintMessage = document.querySelector('#hint');

function guess() {
  let guess = Number(document.querySelector('.inpt-field').value);
  if (guess > 0 && guess < 100 && guess !== NaN) {
    guesses++;
    guesses === 1
      ? (first.innerHTML = guess)
      : guesses === 2
      ? (second.innerHTML = guess)
      : guesses === 3
      ? (third.innerHTML = guess)
      : guesses === 4
      ? (fourth.innerHTML = guess)
      : (fifth.innerHTML = guess);
    let feedback = game.playersGuessSubmission(guess);
    feedbackMessage.innerHTML = feedback;
    feedbackMessage.style.borderColor = '#29928d';
    feedbackMessage.style.borderWidth = '1px';
    warning.innerHTML = '';
    warning.style.borderWidth = '0px';
    hintMessage.innerHTML = '';
    hintMessage.style.borderWidth = '0px';
  } else {
    feedbackMessage.innerHTML = '';
    feedbackMessage.style.borderWidth = '0px';
    warning.innerHTML = "That's an invalid guess. Try again!";
    warning.style.borderColor = 'red';
    warning.style.borderWidth = '1px';
  }
}

function clear() {
  document.querySelector('.inpt-field').value = '';
  guesses = 0;
  first.innerHTML = '';
  second.innerHTML = '';
  third.innerHTML = '';
  fourth.innerHTML = '';
  fifth.innerHTML = '';
  hintMessage.innerHTML = '';
  hintMessage.style.borderWidth = '0px';
  feedbackMessage.innerHTML = '';
  feedbackMessage.style.borderWidth = '0px';
  warning.innerHTML = '';
  warning.style.borderWidth = '0px';
}

submitButton.addEventListener('click', function() {
  guess();
});

restartButton.addEventListener('click', function() {
  game = newGame();
  clear();
});

hintButton.addEventListener('click', function() {
  let hints = game.provideHint();
  hintMessage.innerHTML = `HINT: The number is ${hints[0]}, ${hints[1]}, or ${
    hints[2]
  }.`;
  hintMessage.style.borderColor = 'plum';
  hintMessage.style.borderWidth = '1px';
});
