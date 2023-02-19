# 기능 목록

- 구입금액 입력 받기 💖
  - 자연수인지 확인 💖
  - 구매할 로또 개수 계산하기 💖
  - 거스름돈 계산하기 💖
- 구입 금액만큼 로또 자동 생성 💖
  - 로또 1개 만들기 💖
  - 숫자 6개를 중복되지 않게 뽑는 기능 💖
- 당첨 번호 입력 받기 💖
  - 자연수인지 확인 💖
  - 개수가 6개인지 확인 💖
  - 숫자가 1~45 사이인지 확인 💖
  - 중복 확인 💖
- 보너스 번호 입력 받기 💖
  - 자연수인지 확인 💖
  - 숫자가 1~45 사이인지 확인 💖
  - 당첨 번호와 중복인지 확인 💖
- 각 로또별 당첨 등수 확인 💖
  - 두 로또 번호에서 겹치는 숫자의 개수 확인 💖
  - 로또에 특정 번호가 들어있는지 확인 💖
  - 맞춘 개수를 등수로 바꾸는 기능 💖
- 총 수익률 계산 💖
  - 등수를 상금으로 바꾸는 기능 💖
- 재시작 여부 입력 받기 💖
  - y 또는 n인지 확인 💖

# 리팩터링 목록

## 에러 메세지 (리뷰어 피드백)

1. `view` 십진법이 아닌 숫자가 input으로 들어온 경우, 문자가 input으로 들어온 경우만 검증한다.
2. `domain` 최소 금액 이상인지, 로또 번호의 범위 등은 도메인에서 검증한다.
3. 사용자 친화적인 메세지를 보여준다. 그리고 사용자가 유효한 값을 입력할 수 있도록 유도한다.

## 테스트하기 좋은 설계 (리뷰어 피드백)

### LottoStatistics 객체 추가

1. 등수별 당첨 개수를 세는 로직을 Random에 영향을 받지 않도록 설계하여 테스트하기 쉽도록 한다.

- LottoStatistics은 LottoGame이 필드로 갖고 있는다.
- LottoStatistics.당첨자\_세기() 기능을 갖게 하고, 인자로는 로또 2차원 배열을 받는다.
- LottoStatistics는 필드로 1~5등, 수익률을 갖는다.

2. 수익률을 계산하는 로직은 주요 로직 중 하나이기 때문에 테스트하기 쉽도록 만든다.

- LottoStatistics 객체를 만들고 수익률 계산 로직을 담당하는 메서드를 만든다.
- LottoStatistics.수익률\_계산() 을 LottoGame 메서드 내부에서 호출되도록 한다.
- 인자로는 Lotto 리스트의 2차원 배열 값을 받는다.

3. 결과 데이터를 반환하는 기능을 만든다. 이 역시 테스트 가능하다.

- LottoStatistics.결과값\_가져오기() 의 반환값은 { first, second, ... , earningRate}

## 하나의 객체는 하나의 역할 (리뷰어 피드백)

- Lotto의 역할 : 개별 로또 등수를 결정하는 데에 필요한 정보를 반환한다. (일치 개수, 보너스 여부)
  - ❌ lotto 인스턴스 모두 다른 로또와 비교하는 기능을 갖을 필요가 없다. winningLotto 하나에서 다 하면 된다.
- LottoStatistics의 역할: 당첨 개수와 수익률을 반환한다.

## 조합을 통해 winningLotto 생성하기 (공통 피드백)

## ⭐️ 변화에 취약한 flag를 사용한 로직을 없애기

- constants.js

```
const LOTTO_PRIZE = {
  rankNone: 'none',
  rank1: 'first',
  rank2: 'second',
  rank3: 'third',
  rank4: 'fourth',
  rank5: 'fifth',
};
```

- Outputview.js

```
 printResult({ first, second, third, fourth, fifth }, earningRate)
```

- LottoGame.js

```
#rankingBoard = {
    [LOTTO_PRIZE.rankNone]: 0,
    [LOTTO_PRIZE.rank5]: 0,
    [LOTTO_PRIZE.rank4]: 0,
    [LOTTO_PRIZE.rank3]: 0,
    [LOTTO_PRIZE.rank2]: 0,
    [LOTTO_PRIZE.rank1]: 0,
  }
```

> 현재 문제: 만약 4개일치 + 보너스를 4등으로 변경하고 그 아래 등수는 하나씩 밀리게 된다면? LOTTO_PRIZE를 사용하는 모든 곳에서 기능이 제대로 동작하지 않는다. 하나의 변경사항에 여러 기능이 무너지는 것이다.

그런데 아직 해결방법을 모르겠다... 분기 로직을 key-value 값으로 가지고 있는 것이 아니라 분기를 일일이 해주는 것이 더 좋은 방법 같다.

## 그 외

- 잔돈 계산하는 로직을 굳이 LottoGame의 static으로 표현하지 않고 따로 함수로 분리해도 될 것 같다.
- result 객체를 추가하여 OutputView가 했던 결과 메세지를 생성하는 역할을 result 객체가 하도록 한다.
- y, n과 같이 매직넘버 표현이 덜 된 영역을 찾고 상수로 표현한다.
- 할 수 있다면! 등수(first, second, third)에 대해 flag를 사용하지 않고 해결할 수 있는 방도를 생각해본다.

```

```
