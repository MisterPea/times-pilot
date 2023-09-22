import Image from "next/image";
import EditClipboardIcon from "../Icons/EditClipboardIcon";
import BookmarkIcon from "../Icons/BookmarkIcon";

interface ArticleButtonMobileProps {
  imageURL: string;
  headline: string;
  summary: string;
  url: string;
  bookmarked: boolean;
  addTopicsCallback: () => void;
  toggleBookmarkCallback: () => void;
}

export default function ArticleButtonNonMobile({ imageURL, headline, summary, url, bookmarked, addTopicsCallback, toggleBookmarkCallback }: ArticleButtonMobileProps) {

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
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h2>{headline}</h2>
        </div>
        <summary>{summary}</summary>
      </div>
      <div className="article_tablet_content--bottom">
        <div className="icon_wrap">
          <EditClipboardIcon callback={() => { }} />
          <BookmarkIcon callback={() => { }} selected={bookmarked} />
        </div>
      </div>

    </article>
  );
}