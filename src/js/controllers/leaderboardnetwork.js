import CreateGameRequest from '../request/creategamerequest';

export default class LeaderBoardNetwork {
  gameID = '';

  gameCreated = false;

  constructor(gameID = '') {
    if (gameID.length > 0) {
      this.gameCreated = true;
      this.gameID = gameID;
    }
  }

  fetchScores = () => {
    const url = `games/${this.gameID}/scores/`;
    const res = this.httpgetReques(url);
    return res.then((outcome) => outcome).catch((error) => error);
  };

  postScores = (score) => {
    const url = `games/${this.gameID}/scores/`;
    const result = this.postRequest(url, score);
    return result.then((outcome) => outcome).catch((outcome) => outcome);
  };

  createGame = (name) => {
    const url = 'games';
    const requestBody = new CreateGameRequest(name);
    const result = this.postRequest(url, requestBody);
    result
      .then((outcome) => {
        const arrTemp = outcome.split(' ');
        arrTemp.forEach((val, index) => {
          if (index === 3) {
            this.gameID = val;
            this.gameCreated = true;
            localStorage.setItem('gameID', this.gameID);
          }
        });
      })
      .catch(() => {
        this.gameCreated = false;
      });
  };

  postRequest = async (path, body, returnJson = false) => {
    const endPoint = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
    const response = await fetch(endPoint + path, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const json = returnJson ? await response.json() : await response.text();
    return json;
  };

  httpgetReques = async (path, returnJson = false) => {
    const endPoint = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
    const response = await fetch(endPoint + path);
    const json = returnJson ? await response.json() : await response.text();
    return json;
  };
}