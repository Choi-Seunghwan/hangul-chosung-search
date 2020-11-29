# hangul-chosung-search.js

### [NPM Module](https://www.npmjs.com/package/hangul-chosung-search)

## [Demo Page](https://hangul-chosung-search.netlify.app/)

## Description.

한글 초성 검색 모듈입니다. 대상 문자열에 입력 문자열이 포함되는지를 검사하는 기능입니다. (영문자도 지원합니다.)

회사 업무로 한글 초성 검색 기능을 개발하던 중 만들다보니 재밌기도 하고, 또 오픈 소스로 올리면 많은 분들이 유용하게 사용하실 수 있을 것 같아 NPM Module로 배포하게 되었습니다.

한글은 유니코드 문자집합에서 `U+1100~U+115E`까지는 초성, `U+1161~U+11A7`까지는 중성, `U+11A8~U+11FF`까지는 종성. 이런 식으로 인코딩 되어 있습니다.

자모가 합쳐진 문자를 정규화를 통해 각각 초성, 중성, 종성으로 분해할 수 있는데, 이러한 기능은 [Hangul.js](https://github.com/e-/Hangul.js)를 이용하였습니다.

## 설치

### node.js

```npm install hangul-chosung.search```

## 사용법

```
import search from "hangul-chosung-search";
search(target, text);
// return true or false
```
`hangul-chosung-search` 모듈을 import 한 후, 각각 `target: 대상 문자열`, `text: 입력 문자열` 을 인자로 전달해 줍니다. 

대상 문자열에 입력 문자열이 포함된다면 true 를 반환, 포함되지 않는다면 false 를 반환합니다.

```
search('안녕', 'ㅇ') // true

search('안녕', 'ㄹ') // false

search('Bitcoin', 'bit') // true
```

