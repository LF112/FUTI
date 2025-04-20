import React, { memo } from 'react';

import { languageMap, useHighlight } from '@/components/ui/highlighter/use-highlighter.ts';

import { AsComp, BasicsProps } from '@/components/type.ts';

type IHighlighterProps = BasicsProps & {
  content: string;
  language?: (typeof languageMap)[number];
  as?: AsComp;
};

export const Highlighter: React.FC<IHighlighterProps> = memo(({ content, language, className, style, as: Element = 'div' }) => {
  const { data, isLoading } = useHighlight(content.trim(), language || 'txt');

  Element = Element as 'div';

  return isLoading || !data ? (
    <Element className={className} style={style}>
      <pre>
        <code>{content.trim()}</code>
      </pre>
    </Element>
  ) : (
    <Element
      className={className}
      dangerouslySetInnerHTML={{
        __html: data as string,
      }}
      style={style}
    />
  );
});
Highlighter.displayName = 'FUTI-Highlighter';
