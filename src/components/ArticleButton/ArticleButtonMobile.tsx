/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import BookmarkFlag from "../Icons/BookmarkFlag";
import { BsBookmarkPlus, BsBookmarkDash } from 'react-icons/bs';
import EditClipboardIcon from "../Icons/EditClipboardIcon";
import { useEffect, useRef } from "react";
import { Bookmark } from "../types";

interface ArticleButtonMobileProps {
  imageURL: string;
  headline: string;
  summary: string;
  url: string;
  bookmarked: boolean;
  addTopicsCallback: (value: { title: string, topics: string[]; }) => void;
  toggleBookmarkCallback: (value: Bookmark) => void;
  onSwipeOpen: any;
  currentSwipe: string | null;
  id: string;
  byline: string;
  topics: (string[])[];
  bookmarkInfo: Bookmark;
}

export default function ArticleButtonMobile({
  imageURL,
  headline,
  summary,
  url,
  bookmarked,
  addTopicsCallback,
  toggleBookmarkCallback,
  onSwipeOpen,
  currentSwipe,
  id,
  byline,
  topics,
  bookmarkInfo
}: ArticleButtonMobileProps) {

  const mainArticleRef = useRef<HTMLElement | null>(null);
  const topLevelRef = useRef<HTMLDivElement | null>(null);
  const underButtonRef = useRef<HTMLButtonElement | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  let initTranslateX = 0;
  let startingPoint = 0;
  let maxOpenWidth = 0;
  let isDragging = false;
  let resistanceFactor = 0.025;
  let scrolling = false;

  // This handles the auto-close is another article is swiped
  useEffect(() => {
    if (topLevelRef.current && currentSwipe !== id && currentSwipe !== null) {
      if (getTranslateX(topLevelRef.current) > 0) {
        handleForceClose();
      }
    }
  }, [currentSwipe, id, topLevelRef]);

  useEffect(() => {
    if (mainArticleRef.current) {
      mainArticleRef.current.addEventListener("touchstart", handleMouseDown);
      mainArticleRef.current.addEventListener("mousedown", handleMouseDown);
    }
    return () => {
      if (mainArticleRef.current) {
        mainArticleRef.current.removeEventListener("touchstart", handleMouseDown);
        mainArticleRef.current.removeEventListener("mousedown", handleMouseDown);
      }
    };
  }, [mainArticleRef]);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      scrolling = true;
      handleScrollEnd();
    });
    return () => {
      document.removeEventListener('scroll', handleScrollEnd);
    };
  }, []);

  function handleScrollEnd() {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      scrolling = false;
    }, 300);
  }

  function handleToggleBookmark() {
    toggleBookmarkCallback(bookmarkInfo);
  }

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

  function getTranslateX(element: HTMLElement) {
    const computedStyle = window.getComputedStyle(element);
    const transform = computedStyle.getPropertyValue('transform');
    const matrix = new DOMMatrix(transform);
    return matrix.e; // translateX
  }

  function handleMouseDown(e: MouseEvent | TouchEvent) {
    if (mainArticleRef.current && topLevelRef.current) {
      isDragging = true;
      onSwipeOpen(id);
      mainArticleRef.current.addEventListener('mousemove', handleMouseMove);
      mainArticleRef.current.addEventListener('mouseup', handleMouseUp);
      mainArticleRef.current.addEventListener('mouseleave', handleMouseUp);
      mainArticleRef.current.addEventListener('touchmove', handleMouseMove);
      mainArticleRef.current.addEventListener('touchend', handleMouseUp);
      mainArticleRef.current.addEventListener('touchcancel', handleMouseUp);
      initTranslateX = getTranslateX(topLevelRef.current);
      startingPoint = (e as MouseEvent).pageX ?? (e as TouchEvent).changedTouches[0].pageX;
      maxOpenWidth = mainArticleRef.current.offsetWidth * 0.2;
      topLevelRef.current!.style.transition = 'none';
      underButtonRef.current!.style.transition = 'none';
    }
  }

  function handleForceClose() {
    isDragging = false;
    if (mainArticleRef.current && topLevelRef.current) {
      mainArticleRef.current.removeEventListener('mousemove', handleMouseMove);
      mainArticleRef.current.removeEventListener('mouseleave', handleMouseUp);
      mainArticleRef.current.removeEventListener('mouseup', handleMouseUp);
      mainArticleRef.current.removeEventListener('touchmove', handleMouseMove);
      mainArticleRef.current.removeEventListener('touchend', handleMouseUp);
      mainArticleRef.current.removeEventListener('touchcancel', handleMouseUp);
      requestAnimationFrame(() => {
        topLevelRef.current!.style.transition = "transform 200ms ease-in";
        underButtonRef.current!.style.transition = "width 205ms ease-in";
        topLevelRef.current!.style.transform = 'translate3d(0,0,0)';
        underButtonRef.current!.style.width = '0px';
      });
    }
  }

  function handleMouseUp() {
    let underButtonRest = 0;
    isDragging = false;
    onSwipeOpen(null);
    if (mainArticleRef.current && topLevelRef.current) {
      mainArticleRef.current.removeEventListener('mousemove', handleMouseMove);
      mainArticleRef.current.removeEventListener('mouseleave', handleMouseUp);
      mainArticleRef.current.removeEventListener('mouseup', handleMouseUp);
      mainArticleRef.current.removeEventListener('touchmove', handleMouseMove);
      mainArticleRef.current.removeEventListener('touchend', handleMouseUp);
      mainArticleRef.current.removeEventListener('touchcancel', handleMouseUp);
      let whereToRest = 0;
      const endTranslateX = getTranslateX(topLevelRef.current);
      if (endTranslateX > maxOpenWidth) {
        /*
        Don't exactly know why + 10 works.
        Animations break otherwise.
        Doesn't make sense - change at your own peril 
        */
        whereToRest = maxOpenWidth + 10;
        underButtonRest = maxOpenWidth + 10;
      } else {
        whereToRest = 0;
      }
      topLevelRef.current!.style.transition = "transform 200ms ease-in-out";
      underButtonRef.current!.style.transition = "width 200ms ease-in-out";
      requestAnimationFrame(() => {
        topLevelRef.current!.style.transform = `translateX(${whereToRest}px)`;
        underButtonRef.current!.style.width = `${underButtonRest}px`;
      });
    }
  }

  function handleMouseMove(e: any) {
    e.preventDefault();
    if (isDragging && scrolling === false) {
      const distanceMoved = e.pageX - startingPoint;
      const resistance = Math.abs(distanceMoved) * resistanceFactor;
      const newTranslateX = Math.max(distanceMoved + initTranslateX, 0);
      const newWidth = Math.max(distanceMoved + initTranslateX + 10, 0);

      requestAnimationFrame(() => {
        topLevelRef.current!.style.transform = `translateX(${newTranslateX}px)`;
        underButtonRef.current!.style.width = `${newWidth}px`;
      });

      if (distanceMoved > 0) {
        startingPoint += resistance;
      } else {
        startingPoint -= resistance;
      }
    }
  }

  function handleBookmarkToggleTap() {
    handleForceClose();
    topLevelRef.current!.addEventListener('transitionend', () => {
      handleToggleBookmark();
    }, { once: true });
  }

  return (
    <article
      ref={mainArticleRef} className="article_mobile_base">
      <div ref={topLevelRef} className="top_level_wrapper">
        <div className="bookmark_flag_wrap"><BookmarkFlag selected={bookmarked} /></div>
        <div
          onPointerUp={(e) => {
            if (topLevelRef.current) {
              if (getTranslateX(topLevelRef.current) === 0) {
                e.stopPropagation();
                window.open(url, "_blank", "noopener noreferrer");
              }
            }
          }}
          className="article_mobile_content-left">
          <div className="article_mobile_content-left--top">
            <div className="image_wrap">
              <Image
                src={imageURL}
                alt={headline}
                unoptimized
                fill
              />
            </div>
            <h2>{headline}</h2>
          </div>
          <div className="article_mobile_content-left--bottom">
            <summary>{summary}</summary>
          </div>
        </div>
        <div className="article_mobile_content-right">
          <div className="article_mobile_content-right--icon_button">
            <EditClipboardIcon callback={handleShowTopics} />
          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleBookmarkToggleTap();
        }}
        ref={underButtonRef} className={`under_button${bookmarked ? " bookmarked" : ""}`}
      >
        <div className="under_button__svg_wrapper">
          {bookmarked ? <BsBookmarkDash /> : <BsBookmarkPlus />}
        </div>
      </button>
    </article>
  );
}