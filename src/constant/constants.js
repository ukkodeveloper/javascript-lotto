const LOTTO_RULE = {
  price: 1000,
  size: 6,
  minNumber: 1,
  maxNumber: 45,
  separator: ',',
};

const RANK_BY_COUNT = {
  3: LOTTO_PRIZE.rank5,
  4: LOTTO_PRIZE.rank4,
  5: LOTTO_PRIZE.rank3,
  6: LOTTO_PRIZE.rank1,
};

const PRIZE_BY_RANK = {
  [LOTTO_PRIZE.rankNone]: 0,
  [LOTTO_PRIZE.rank5]: 5_000,
  [LOTTO_PRIZE.rank4]: 50_000,
  [LOTTO_PRIZE.rank3]: 1_500_000,
  [LOTTO_PRIZE.rank2]: 30_000_000,
  [LOTTO_PRIZE.rank1]: 2_000_000_000,
};

export { LOTTO_RULE, LOTTO_PRIZE, RANK_BY_COUNT, PRIZE_BY_RANK };
