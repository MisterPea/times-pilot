import Image from "next/image";
import EditClipboardIcon from "../Icons/EditClipboardIcon";
import BookmarkIcon from "../Icons/BookmarkIcon";
import { Bookmark } from "../types";

interface ArticleButtonMobileProps {
  imageURL: string;
  headline: string;
  summary: string;
  url: string;
  bookmarked: boolean;
  addTopicsCallback: (value: { title: string, topics: string[]; }) => void;
  toggleBookmarkCallback: (value: Bookmark) => void;
  byline: string;
  topics: (string[])[];
  bookmarkInfo: Bookmark;
  uid: string | null | undefined;
}

export default function ArticleButtonNonMobile({
  imageURL,
  headline,
  summary,
  url,
  bookmarked,
  addTopicsCallback,
  toggleBookmarkCallback,
  topics,
  byline,
  bookmarkInfo,
  uid
}: ArticleButtonMobileProps) {
  const regexPattern = /(?:By|,|and)\s+/gi;
  const allTopics = byline.split(regexPattern).filter(Boolean);
  allTopics.push(...topics.flat());

  function handleShowTopics() {
    const articleTopics = {
      title: headline,
      topics: allTopics,
    };
    // Calling back on button click
    addTopicsCallback(articleTopics);
  }

  function handleBookmark() {
    toggleBookmarkCallback(bookmarkInfo);
  }

  return (
    <article
      className="article_tablet_base"
      onClick={(e) => {
        e.stopPropagation();
        window.open(url, "_blank", "noopener noreferrer");
      }}>
      <div className="article_tablet_content--top">
        <div className="image_headline">
          <div className="image_wrap">
            <Image
              src={imageURL}
              alt={headline}
              unoptimized
              fill
              priority
            />
          </div>
          <h2>{headline}</h2>
        </div>
        <summary>{summary}</summary>
      </div>
      <div className="article_tablet_content--bottom">
        {uid && <div className="icon_wrap">
          <BookmarkIcon key="bookmark-icon" callback={handleBookmark} selected={bookmarked} />
          <EditClipboardIcon key="clipboard-icon" callback={handleShowTopics} />
        </div>}
        {!uid && <div className="icon_wrap">
          <EditClipboardIcon key="clipboard-icon" callback={handleShowTopics} />
        </div>}
      </div>
    </article>
  );
}