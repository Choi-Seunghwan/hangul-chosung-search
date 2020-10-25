const hangul = require('hangul-js');

const disassembleSearch = (target, text) => {
  target = target.toUpperCase();
  text = text.toUpperCase();

  // separate if character at index is jong-sung
  for (let i = 0; i < text.length; i++) {
    if (Hangul.isJong(text[i])) {
      text = text.slice(0, i) + Hangul.d(text[i]).join('') + text.slice(i + 1);
    }
  }
  // disassembled array
  const dTarget = Hangul.d(target, true);
  const dText = Hangul.d(text, true);

  // cho-sung string for comparison
  const choTarget = dTarget.map(el => el[0]).join('');
  const choText = dText.map(el => el[0]).join('');
  let correctIdx = choTarget.indexOf(choText);
  let check = false;

  while (correctIdx >= 0) {
    // set check boolean to true
    check = true;

    for (let charIdx = 0; charIdx < dText.length; charIdx++) {
      const dTargetIdx = charIdx + correctIdx;

      for (let dIdx = 0; dIdx < dText[charIdx].length; dIdx++) {
        // check both disassembled characters array
        if (
          // (Hangul.isComplete(text[charIdx]) &&
          // charIdx < dText.length - 1 &&
          // dTarget[dTargetIdx].length !== dText[charIdx].length) || // allow rough typos
          dTarget[dTargetIdx][dIdx] !== dText[charIdx][dIdx]
        ) {
          check = false;

          // check if disassembled last character same as next character's cho-sung
          if (
            // dText.length - 1 === charIdx && // allow rough typos
            dIdx === dText[charIdx].length - 1 &&
            Hangul.isCho(dText[charIdx][dIdx]) &&
            dTarget[dTargetIdx + 1] &&
            dTarget[dTargetIdx + 1][0] === dText[charIdx][dIdx]
          )
            check = true;

          break;
        }
      }

      // again check
      if (check === false) {
        correctIdx = choTarget.indexOf(choText, correctIdx + 1);
        break;
      }
    }
    if (check) break;
  }

  return check;
}





computed: {
  ...mapState('currencies', ['currencyData', 'symbolSortedMajorCurrencyIdList']),
  ...mapState('dwContext', ['lang']),
  majorCurrencyIdSearchFilteredList() {
    if (!this.currencyData || !this.symbolSortedMajorCurrencyIdList) return [];
    const majorCurrencyIdSearchFilteredList = [];

    this.symbolSortedMajorCurrencyIdList.forEach(currencyId => {
      const currency = this.currencyData[currencyId];

      const inputValue = this.$util.trimSpace(this.criteriaCurrencySearchText);
      if (
        !inputValue ||
        this.$util.disassembleSearch(currency.symbol, inputValue) ||
        this.$util.disassembleSearch(currency.name[this.lang], inputValue)
      ) {
        majorCurrencyIdSearchFilteredList.push(currencyId);
      }
    });

    return majorCurrencyIdSearchFilteredList;
  },

