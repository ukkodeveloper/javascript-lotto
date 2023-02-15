import Random from '../util/Random.js';
import Lotto from './Lotto.js';

const LOTTO_PRICE = 1000;
const LOTTO_SIZE = 6;
const LOTTO_MIN_NUMBER = 1;
const LOTTO_MAX_NUMBER = 45;

const RANK_NONE = 0;
const RANK_5 = 5;
const RANK_4 = 4;
const RANK_3 = 3;
const RANK_2 = 2;
const RANK_1 = 1;

const RANK_BY_COUNT = {
  3: RANK_5,
  4: RANK_4,
  5: RANK_3,
  6: RANK_1,
};

class LottoGame {
  #lottos;

  #rankingBoard = {
    [RANK_NONE]: 0,
    [RANK_5]: 0,
    [RANK_4]: 0,
    [RANK_3]: 0,
    [RANK_2]: 0,
    [RANK_1]: 0,
  };

  constructor(money) {
    const count = Math.floor(money / LOTTO_PRICE);
    this.#lottos = Array.from({ length: count }, () => {
      const randomNumbers = Random.generateUniqueNumbersInRange(
        LOTTO_SIZE,
        LOTTO_MIN_NUMBER,
        LOTTO_MAX_NUMBER,
      );

      return new Lotto(randomNumbers);
    });
  }

  convertCountToRank(intersectCount, hasBonus) {
    const rank = RANK_BY_COUNT[intersectCount];
    if (!rank) return RANK_NONE;
    if (rank === RANK_3 && hasBonus) return RANK_2;
    return rank;
  }

  updateRankingBoard(winningNumbers, bonusNumber) {
    this.#lottos.forEach((lotto) => {
      const intersectCount = lotto.countIntersect(winningNumbers);
      const hasBonus = lotto.includes(bonusNumber);
      const rank = this.convertCountToRank(intersectCount, hasBonus);
      this.#rankingBoard[rank] += 1;
    });
  }

  getRankingBoard() {
    return { ...this.#rankingBoard };
  }

  static calculateTheChange(money) {
    return money % LOTTO_PRICE;
  }
}

export default LottoGame;
