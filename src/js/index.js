import ScoreController from './controllers/scorecontroller';
import LeaderBoardNetwork from './controllers/leaderboardnetwork';
import '../css/style.css';
import CreateScoreRequest from './request/createscorerequest';

const scoreController = new ScoreController([]);
const gameId = localStorage.getItem('gameID');
let leaderboardnetwork = null;

const refereshList = () => {
  const domScoresHolders = document.getElementById('scoreHolder');
  domScoresHolders.innerHTML = '';
  leaderboardnetwork.fetchScores().then((outcome) => {
    const res = JSON.parse(outcome);
    scoreController.scoresArray = res.result;
    // scoreController.populateDemo(5);
    scoreController.scoresArray.forEach((element, loopIndex) => {
      const singleScore = document.createElement('li');
      singleScore.className = loopIndex % 2 === 0 ? 'list-group-item' : 'list-group-item disabled';
      const textNode = document.createTextNode(`Name: ${element.user} Score: ${element.score}`);
      singleScore.appendChild(textNode);
      domScoresHolders.appendChild(singleScore);
    });
  });
};

const buildDemoView = () => {
  if (gameId === null || gameId.length === 0 || gameId === undefined) {
    leaderboardnetwork = new LeaderBoardNetwork();
    leaderboardnetwork.createGame('Rich Game');
  } else {
    leaderboardnetwork = new LeaderBoardNetwork(gameId);
  }
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
  const createScoreRequest = new CreateScoreRequest(inputPlayerName, inputScore);
  const response = leaderboardnetwork.postScores(createScoreRequest);
  response.then(() => {
    // Todo Implement view to show status
    refereshList();
  });
});

refreshBtn.addEventListener('click', () => {
  refereshList();
});