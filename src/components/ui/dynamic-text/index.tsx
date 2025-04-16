import React, { memo, useEffect, useRef, useState } from 'react';

import { DOMMotionComponents, motion, MotionProps } from 'motion/react';
import { isEmpty } from 'underscore';

import { AsComp, BasicsProps } from '@/components/type.ts';

import useMemoizedFn from '@/hooks/use-memoized-fn.ts';
import { cn } from '@/lib/utils';

import { getRandom, HIRAGANA_AND_KATAKANA, isCJK, isHiragana, isInserter, isKatakana, isMultibyteText, NUMBER_AND_ENGLISH, SYLLABLES_AND_LOANWORDS, wait } from './utils';

type IFUTIDynamicTextProps = BasicsProps<'h1', 'children'> &
  Omit<MotionProps, 'onAnimationComplete'> & {
    text?: string;
    insertPlaceholderDuration?: number; // 插入占位符持续时间（毫秒）
    characterRevealDuration?: number; // 每个字符显示持续时间（毫秒）
    shuffleCount?: number; // 洗牌次数
    pauseBeforeReveal?: number; // 显示真实字符前的暂停时间（毫秒）

    onAnimationComplete?: () => void; // 动画完成回调
    onPlaceholderComplete?: () => void; // 插入占位符完成回调

    as?: AsComp;
  };

export const FUTIDynamicText: React.FC<IFUTIDynamicTextProps> = memo(
  ({
    text,
    children,
    className,
    style,
    insertPlaceholderDuration = 100,
    characterRevealDuration = 20,
    shuffleCount = 14,
    pauseBeforeReveal = 50,
    onAnimationComplete,
    onPlaceholderComplete,
    as: Element = motion.h1,
    ...rest
  }) => {
    Element = Element as DOMMotionComponents['h1'];

    const [visibleText, setVisibleText] = useState('');

    const prevTextRef = useRef<string | null>(null);

    const handleAnimation = useMemoizedFn(async () => {
      const target = text || children?.toString();
      if (!target || isEmpty(target)) return;
      prevTextRef.current = target;

      const texts = (target || ' ').toString().split('');
      const insertInterval = insertPlaceholderDuration / texts.length; // 100ms / 100 字符

      for (const chunk of texts) {
        if (isInserter(chunk)) {
          setVisibleText((prev) => prev + chunk);
        } else if (isMultibyteText(chunk)) {
          setVisibleText((prev) => prev + '//');
        } else {
          setVisibleText((prev) => prev + '/');
        }

        await wait(insertInterval);
      }

      await wait(pauseBeforeReveal);

      onPlaceholderComplete?.();

      let index = 0;
      const temp: Record<number, number> = {};
      let finalText = '';

      while (finalText !== target) {
        finalText = texts
          .map((it, i) => {
            if (isInserter(it)) {
              return it;
            } else if (i >= index) {
              return isMultibyteText(it) ? '//' : '/';
            } else {
              void (void 0 === temp[i] && (temp[i] = shuffleCount));
              if (temp[i]) {
                temp[i]--;
                if (isCJK(it)) {
                  return getRandom(HIRAGANA_AND_KATAKANA);
                } else if (isHiragana(it) || isKatakana(it)) {
                  return getRandom(SYLLABLES_AND_LOANWORDS);
                } else {
                  return getRandom(NUMBER_AND_ENGLISH);
                }
              } else {
                return it;
              }
            }
          })
          .join('');

        setVisibleText(finalText);
        index++;

        await wait(characterRevealDuration);
      }

      onAnimationComplete?.();
    });

    useEffect(() => {
      if (prevTextRef.current) {
        setVisibleText('');
        void handleAnimation();
      }
    }, [handleAnimation, text]);

    return (
      <Element
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.016 } }}
        onAnimationStart={visibleText === text ? void 0 : handleAnimation}
        className={cn('inline-block leading-tight font-bold', className)}
        style={style ?? {}}
        {...rest}
      >
        {visibleText}
      </Element>
    );
  },
);
FUTIDynamicText.displayName = 'FUTI-DynamicText';
