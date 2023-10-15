import { useEffect, useState } from "react";
import ArticleButtonMobile from "./ArticleButtonMobile";
import ArticleButtonNonMobile from "./ArticleButtonNonMobile";

export type Article = {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  byline: string;
  item_type: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  multimedia: Multimedia[];
  short_url: string;
  addClass: string | undefined;
};

type Multimedia = {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
};

type Bookmark = {
  id: Article["short_url"],
  title: Article["title"],
  summary: Article["abstract"],
};

interface ArticleButtonGroupProps {
  articles: Article[];
  setShowModal?: () => void;
  setModalFacets?: () => void;
  setBookmark?: (newValue: Bookmark) => void;
}


export default function ArticleButtonGroup({ articles }: ArticleButtonGroupProps) {
  const [rankedArticles, setRankedArticles] = useState<Article[]>([]);
  const [isOpen, setIsOpen] = useState<string | null>(null); // current swipes that are open

  function handleOpenSwipe(id: string) { }
  function handleClosedSwipe() { }

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
    if (multimediaArray.length) {
      for (const image of multimediaArray) {
        if (image.width < smallestWidth && image.type === 'image') {
          smallestObject.url = image.url;
          smallestObject.alt = image.caption;
          smallestWidth = image.width;
        }
      }
    }
    return { url: smallestObject.url, alt: smallestObject.alt };
  }

  return (
    <>
      <div className="article_group--base">
        <ul className="article_group--ul">
          {rankedArticles.map(({ title, abstract, url, multimedia, addClass, short_url }, index) => (
            <>
              <li key={`${index}-mobile`} className="article_group-mobile">
                <ArticleButtonMobile
                  headline={title}
                  summary={abstract}
                  imageURL={thumbnail(multimedia).url}
                  url={url}
                  bookmarked={false}
                  toggleBookmarkCallback={() => { }}
                  addTopicsCallback={() => { }}
                  id={`${index}-${short_url}`}
                  currentSwipe={isOpen}
                  onSwipeOpen={setIsOpen}
                />
              </li>
              <li key={`${index}-tablet`} className={`article_group-tablet${addClass ? ' ' + addClass : ''}`}>
                <ArticleButtonNonMobile
                  headline={title}
                  summary={abstract}
                  imageURL={thumbnail(multimedia).url}
                  url={url}
                  bookmarked={false}
                  toggleBookmarkCallback={() => { }}
                  addTopicsCallback={() => { }}
                />
              </li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
};
