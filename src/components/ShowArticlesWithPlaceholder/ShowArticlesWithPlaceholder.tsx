import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ArticleButtonPlaceholderGroup from '../ArticleButtonPlaceholderGroup/ArticleButtonPlaceholderGroup';
import ArticleButtonGroup from '../ArticleButton/ArticleButtonGroup';
import { Article } from '../types';
import { SectionDataType } from '../../../pages/[section]';

interface ShowArticleWithPlaceholderProps {
  isNavigating: boolean;
  data: SectionDataType;
}

/* 
For some reason we were unable to add transitions to the framer-motion params. 
When transition was added, the placeholder wouldn't unmount. Pretty strange, and it worth looking in to.
It would be nice to be able to have more control over the timing.
*/
const ShowArticleWithPlaceholder = React.memo(({ isNavigating, data }: ShowArticleWithPlaceholderProps) => {
  // Filter out articles without a title or summary
  let articlesFiltered: Article[] = [];
  if (data) {
    articlesFiltered = data.results.filter(({ title, abstract }) => title.length > 0 && abstract.length > 0);
  }

  return (
    <AnimatePresence mode='wait'>
      {isNavigating === false ? (
        <motion.div
          key='articles'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ArticleButtonGroup articles={articlesFiltered} />
        </motion.div>
      ) : (
        <motion.div
          key='placeholder'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ArticleButtonPlaceholderGroup />
        </motion.div>
      )}
    </AnimatePresence>
  );
}, (prevProps, nextProps) => {
  // Only re-render if isNavigating has changed
  return prevProps.isNavigating === nextProps.isNavigating;
});

ShowArticleWithPlaceholder.displayName = 'ShowArticleWithPlaceholder';

export default ShowArticleWithPlaceholder;
