import { useRef, useState } from "react";
import MainButtonHTML from "../MainButtonHTML/MainButtonHTML";

interface BookmarkedArticleProps {
  date: string;
  headline: string;
  summary: string;
  linkToArticle: string;
  deleteCallback: (id: string) => void;
  id: string;
}

export default function BookmarkedArticle({ headline, summary, date, linkToArticle, deleteCallback, id }: BookmarkedArticleProps) {
  const [enableDelete, setEnableDelete] = useState<boolean>(false);
  const countdownBarRef = useRef<HTMLDivElement | null>(null);
  const articleRef = useRef<HTMLElement | null>(null);
  let observer: MutationObserver;

  function handleDeleteCall() {
    const config = { attributes: true, childList: true, subtree: true };
    function callback(e: MutationRecord[]) {
      // addedNodes.length is telling us the overlay is visible and we're not removing the overlay
      if (countdownBarRef.current && e[0].addedNodes.length) {
        countdownBarRef.current.addEventListener('animationend', () => {
          handleCompleteDelete();
        }, { once: true });
      }
    }

    // To make the animation a bit simpler and the dom cleaner
    // we're detecting when the dom is updated.
    // Then we're listening for the animation to complete.
    observer = new MutationObserver(callback);
    setEnableDelete(true);

    if (articleRef.current) {
      observer.observe(articleRef.current, config);
    }
  }

  function handleStopDelete() {
    const overlay = articleRef.current?.querySelector(".bookmarked_article--undo_overlay");
    overlay?.classList.add('stop');
    countdownBarRef.current?.classList.add("stop");
    overlay!.addEventListener("animationend", () => setEnableDelete(false), { once: true });
  }

  function handleCompleteDelete() {
    const deleteOverlay = articleRef.current!.querySelector('.delete_overlay');
    deleteOverlay?.classList.add('remove');
    deleteOverlay?.addEventListener('animationend'  , () => deleteCallback(id), { once: true });
    observer.disconnect();
  }

  return (
    <article ref={articleRef} className="bookmarked_article">
      <div className="delete_overlay" />
      {enableDelete && <div className="bookmarked_article--undo_overlay">
        <MainButtonHTML label="Undo Remove" linkCallback={handleStopDelete} undoIcon />
        <div ref={countdownBarRef} className="countdown_bar" />
      </div>}
      <button
        onClick={(e) => {
          e.stopPropagation();
          window.open(linkToArticle, "_blank", "noopener noreferrer");
        }}
        className="bookmarked_article--text_content">
        <p className="date">{date}</p>
        <h2>{headline}</h2>
        <p>{summary}</p>
      </button>
      <div className="bookmarked_article--control">
        <button onClick={handleDeleteCall}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M15 3V4H20V6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4V4H9V3H15ZM7 19H17V6H7V19ZM9 8H11V17H9V8ZM15 8H13V17H15V8Z" fill="white" />
          </svg>
        </button>
      </div>
    </article>
  );
}