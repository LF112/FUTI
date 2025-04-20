import { createHighlighterCore } from '@shikijs/core';
import { transformerNotationDiff, transformerNotationErrorLevel, transformerNotationFocus, transformerNotationHighlight, transformerNotationWordHighlight } from '@shikijs/transformers';
import type { HighlighterCore } from '@shikijs/types';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import useSWR from 'swr';

import { SHIKI_LANGS } from './langs';
import { SHIKI_THEME } from './themes';

export const languageMap = SHIKI_LANGS.map(({ name }) => name);

const FALLBACK_LANG = 'txt';
const FALLBACK_LANGS = [FALLBACK_LANG];

let cacheHighlighter: HighlighterCore;

const initHighlighter = async (lang: string): Promise<HighlighterCore> => {
  let highlighter = cacheHighlighter;
  const language = lang.toLowerCase();

  if (highlighter && FALLBACK_LANGS.includes(language)) {
    return highlighter;
  }

  if (languageMap.includes(language as any) && !FALLBACK_LANGS.includes(language)) {
    FALLBACK_LANGS.push(language);
  }

  highlighter = await createHighlighterCore({
    langs: SHIKI_LANGS,
    themes: SHIKI_THEME,
    engine: createOnigurumaEngine(() => import('shiki/wasm')),
  });

  cacheHighlighter = highlighter;

  return highlighter;
};

export const useHighlight = (text: string, lang: string, theme = 'one-dark-pro') =>
  useSWR(
    [lang.toLowerCase(), theme, text].join('-'),
    async () => {
      try {
        const language = lang.toLowerCase();
        const highlighter = await initHighlighter(language);
        return highlighter?.codeToHtml(text, {
          lang: languageMap.includes(language as any) ? language : FALLBACK_LANG,
          theme,
          transformers: [transformerNotationDiff(), transformerNotationHighlight(), transformerNotationWordHighlight(), transformerNotationFocus(), transformerNotationErrorLevel()],
        });
      } catch {
        return '';
      }
    },
    { revalidateOnFocus: false },
  );
