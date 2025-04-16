import { contains, random, range, some } from 'underscore';

// CONSTANTS
export const NUMBER_AND_ENGLISH = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
// ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦㄧㄨㄩ〇口甲乙丙丁戊己庚辛壬癸
export const HIRAGANA_AND_KATAKANA = 'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦㄧㄨㄩ〇口甲乙丙丁戊己庚辛壬癸'.split('');
export const SYLLABLES_AND_LOANWORDS =
  'あぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺーヾ'.split(
    '',
  );
// END CONSTANTS

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const isInserter = (target: string) => ' ' === target || '-' === target || '/' === target || "'" === target;

export const getRandom = (texts: string[]) => texts[random(0, texts.length - 1)];

export const isCJK = (target: string) => {
  const code = target.codePointAt(0);
  return contains(range(19_968, 40_907), code) || contains(range(63_744, 64_106), code);
};

export const isHiragana = (target: string) => contains(range(12_353, 12_438), target.codePointAt(0));

export const isKatakana = (target: string) => contains(range(12_448, 12_543), target.codePointAt(0));

export const isMultibyteText = (target: string) => {
  const code = target.codePointAt(0);
  return some([
    contains(range(13_312, 19_893), code),
    contains(range(19_968, 40_907), code),
    contains(range(63_744, 64_106), code),
    contains(range(12_353, 12_438), code),
    contains(range(12_448, 12_543), code),
  ]);
};
