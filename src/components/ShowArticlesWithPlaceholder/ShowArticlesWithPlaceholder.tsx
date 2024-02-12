import React, { Dispatch } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ArticleButtonPlaceholderGroup from '../ArticleButtonPlaceholderGroup/ArticleButtonPlaceholderGroup';
import ArticleButtonGroup from '../ArticleButton/ArticleButtonGroup';
import { Article } from '../types';
import { SectionDataType } from '../../../pages/[section]';
import createId from '@/helpers/createId';

import { SetStateAction } from 'react';

interface ShowArticleWithPlaceholderProps {
  setIsNavigating: Dispatch<SetStateAction<boolean>>;
  isNavigating: boolean;
  data: SectionDataType;
}


/* 
For some reason we were unable to add transitions to the framer-motion params. 
When transition was added, the placeholder wouldn't unmount. Pretty strange, and it worth looking in to.
It would be nice to be able to have more control over the timing.
*/
const ShowArticleWithPlaceholder = React.memo(({ isNavigating, setIsNavigating, data }: ShowArticleWithPlaceholderProps) => {
  // Filter out articles without a title or summary
  let articlesFiltered: Article[] = [];
  if (data) {
    articlesFiltered = data.results.filter(({ title, abstract }) => title.length > 0 && abstract.length > 0);
  }
  return (
    <>
      <AnimatePresence mode="popLayout">
        {isNavigating === false ? (
          <motion.div
            key={data.section}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.3,
                duration:0.7
              }
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.3
              }
            }}
          >
            <ArticleButtonGroup articles={articlesFiltered} />
          </motion.div>
        ) : (
          <motion.div
            key="placeholders"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.3,
                duration:0.6
              }
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.3
              }
            }}
          >
            <ArticleButtonPlaceholderGroup />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}, (prevProps, nextProps) => {
  // Only re-render if isNavigating has changed
  return prevProps.isNavigating === nextProps.isNavigating;
});

ShowArticleWithPlaceholder.displayName = 'ShowArticleWithPlaceholder';

export default ShowArticleWithPlaceholder;
