export default class Score {
    #index = 0;

    score;

    name;

    constructor(name, score = 0) {
      this.name = name;
      this.score = score;
    }

    updateIndex(index) {
      this.#index = index;
    }
}