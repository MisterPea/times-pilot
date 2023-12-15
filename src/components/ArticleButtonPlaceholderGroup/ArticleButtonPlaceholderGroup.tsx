import ArticleButtonPlaceholder from "../ArticleButtonPlaceholder/ArticleButtonPlaceholder";
import { motion } from 'framer-motion';

export default function ArticleButtonPlaceholderGroup() {
  const populatedArray = new Array(24).fill(1).map((n, i) => n + i);
  return (
    <motion.div
      className="article_group--base placeholder_div">
      <ul className="article_group--ul">
        {populatedArray.map((_, index) => {
          return (
            <div style={{ display: 'contents', position: 'inherit' }} key={`${index}-article`}>
              <ArticleButtonPlaceholder />
            </div >
          );
        })}
      </ul>
    </motion.div>
  );
}