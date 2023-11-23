"use client"
import { useContext, useEffect, useState } from "react";
import ArticleButtonMobile from "./ArticleButtonMobile";
import ArticleButtonNonMobile from "./ArticleButtonNonMobile";
import AddTopicsOverlay from "./AddTopicsOverlay";
import { AuthContext } from "../../db/Auth";
import { Bookmark, Article, Multimedia } from "../types";
import createId from "../../helpers/createId";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

interface ArticleButtonGroupProps {
  articles: Article[];
  setShowModal?: () => void;
  setModalFacets?: () => void;
  setBookmark?: (newValue: Bookmark) => void;
}

export default function ArticleButtonGroup({ articles }: ArticleButtonGroupProps) {
  const [rankedArticles, setRankedArticles] = useState<Article[]>([]);
  const [isOpen, setIsOpen] = useState<string | null>(null); // current swipes that are open
  const [titleAndTopics, setTitleAndTopics] = useState<{ title: string, topics: string[]; } | null>(null);
  const { updateSections, subscriptions, emailActive, updateBookmarks, bookmarks, uid } = useContext(AuthContext);
  const { route } = useRouter();

  useEffect(() => {
    // ONLY FOR 768px AND UP //
    /* The idea here is to have no empty cells, so we double the width so we fill
       blank space. The maximum number of doubles is 4, so we find the 4 longest
       title and headlines, because those are the ones we'd want to spread out.
       the rest of the implementation is handled via css */
    const seenArticles = [];
    const articlesLength = articles.length;
    for (let i = 0; i < articlesLength; i += 1) {
      const titleVal = articles[i].title.length * 1.25;
      const summaryVal = articles[i].abstract.length;
      seenArticles.push([i, titleVal + summaryVal]);
    }
    // Sort longest title/summary to shortest
    seenArticles.sort(([i_a, b], [i_c, d]) => d - b);

    // Get the top 4 longest articles
    const truncated = seenArticles.slice(0, 4).map((elem) => elem[0]);

    // calculate number of spaces to fill per width
    const addOne: string[] = ['two_wide', 'three_wide', 'four_wide', 'five_wide'];
    const addTwo: string[] = ['two_wide', 'three_wide', 'four_wide', 'five_wide'];
    const addThree: string[] = ['two_wide', 'three_wide', 'four_wide', 'five_wide'];
    const addFour: string[] = ['two_wide', 'three_wide', 'four_wide', 'five_wide'];
    const extra2 = articlesLength % 2 !== 0 ? 2 - articlesLength % 2 : 0;
    const extra3 = articlesLength % 3 !== 0 ? 3 - articlesLength % 3 : 0;
    const extra4 = articlesLength % 4 !== 0 ? 4 - articlesLength % 4 : 0;
    const extra5 = articlesLength % 5 !== 0 ? 5 - articlesLength % 5 : 0;
    const toAdd = [extra2, extra3, extra4, extra5];
    const toAddToClass: string[][] = [[], [], [], []];
    const extraWideClasses: string[][] = [addOne, addTwo, addThree, addFour];
    for (let i = 0; i < toAdd.length; i += 1) {
      for (let j = 0; j < toAdd[i]; j += 1) {
        toAddToClass[j].push(extraWideClasses[j][i]);
      }
    }
    for (let i = 0; i < truncated.length; i += 1) {
      articles[truncated[i]].addClass = toAddToClass[i].join(' ');
    }
    setRankedArticles(articles);
  }, [articles]);

  // We're finding the smallest image to load
  function thumbnail(multimediaArray: Multimedia[]) {
    let smallestWidth = Infinity;
    let smallestObject = { url: '', alt: '' };
    if (multimediaArray && multimediaArray.length) {
      for (const image of multimediaArray) {
        if (image.width < smallestWidth && image.type === 'image') {
          smallestObject.url = image.url;
          smallestObject.alt = image.caption;
          smallestWidth = image.width;
        }
      }
    } else {
      // Image not found
      smallestObject.url = '/defaultLogo.gif';
    }
    return { url: smallestObject.url, alt: smallestObject.alt };
  }

  function handleHideTopics() {
    setTitleAndTopics(null);
  }

  function handleShowTopics({ title, topics }: { title: string, topics: string[]; }) {
    setTitleAndTopics({ title, topics });
  }

  function handleBookmarkToggle(bookmarkInfo: Bookmark) {
    updateBookmarks && updateBookmarks(bookmarkInfo);
  }

  function isBookmarked(url: string) {
    if (!bookmarks) {
      return false;
    }
    for (let i = 0; i < bookmarks.length; i += 1) {
      if (bookmarks[i].url === url) {
        return true;
      }
    }
    return false;
  }


  return (
    <>
      <AddTopicsOverlay
        showModal={!!titleAndTopics?.topics.length}
        title={titleAndTopics?.title || ''}
        topics={titleAndTopics?.topics || []}
        closeOverlay={handleHideTopics}
        subscriptions={subscriptions}
        updateSections={updateSections}
        emailActive={emailActive}
        uid={uid}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            // layout="preserve-aspect"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                ease: 'easeInOut',
                duration: 1,
              }
            }}
            exit={{
              opacity: 0,
              transition: {
                ease: 'easeInOut',
                duration: 1,
              }
            }}
            key={route}
            className="article_group--base">
            <ul className="article_group--ul">
              {rankedArticles.map(({
                title, abstract, url, multimedia, addClass, short_url, published_date, byline, des_facet, org_facet, per_facet, geo_facet }, index) => {
                const id = createId();
                return (
                  <div style={{ display: 'contents', position: 'inherit' }} key={`${index}-mobile`}>
                    <li className="article_group-mobile">
                      <ArticleButtonMobile
                        bookmarkInfo={{ id, url: url, date: published_date, title, summary: abstract }}
                        headline={title}
                        summary={abstract}
                        imageURL={thumbnail(multimedia).url}
                        url={url}
                        bookmarked={isBookmarked(url)}
                        toggleBookmarkCallback={handleBookmarkToggle}
                        addTopicsCallback={handleShowTopics}
                        id={`${index}-${short_url}`}
                        currentSwipe={isOpen}
                        onSwipeOpen={setIsOpen}
                        byline={byline}
                        topics={[des_facet, org_facet, per_facet, geo_facet]}
                        uid={uid}
                      />
                    </li>
                    <li className={`article_group-tablet${addClass ? ' ' + addClass : ''}`}>
                      <ArticleButtonNonMobile
                        bookmarkInfo={{ id, url: url, date: published_date, title, summary: abstract }}
                        headline={title}
                        summary={abstract}
                        imageURL={thumbnail(multimedia).url}
                        url={url}
                        bookmarked={isBookmarked(url)}
                        toggleBookmarkCallback={handleBookmarkToggle}
                        addTopicsCallback={handleShowTopics}
                        byline={byline}
                        topics={[des_facet, org_facet, per_facet, geo_facet]}
                        uid={uid}
                      />
                    </li>
                  </div >
                );
              })}
            </ul>
          </motion.div>
        </AnimatePresence>
      </AddTopicsOverlay >
    </>
  );
};
