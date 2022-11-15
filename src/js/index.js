import ScoreController from './controllers/scorecontroller';
import '../css/style.css';

const scoreController = new ScoreController([]);
// Create five demos
scoreController.populateDemo(5);

const refereshList = () => {
  const domScoresHolders = document.getElementById('scoreHolder');
  domScoresHolders.innerHTML = '';
  scoreController.scoresArray.forEach((element, loopIndex) => {
    const singleScore = document.createElement('li');
    singleScore.className = loopIndex % 2 === 0 ? 'list-group-item' : 'list-group-item disabled';
    const textNode = document.createTextNode(`Name: ${element.name} Score: ${element.score}`);
    singleScore.appendChild(textNode);
    domScoresHolders.appendChild(singleScore);
  });
};

const buildDemoView = () => {
  refereshList();
};

buildDemoView();

// Buttons
const subitBtn = document.getElementById('submitBtn');
const refreshBtn = document.getElementById('refreshBtn');

// Event listerners
subitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const inputPlayerName = document.getElementById('name').value;
  const inputScore = document.getElementById('score').value;
  scoreController.addScore(inputPlayerName, inputScore);
  refereshList();
});

refreshBtn.addEventListener('click', () => {
  refereshList();
});