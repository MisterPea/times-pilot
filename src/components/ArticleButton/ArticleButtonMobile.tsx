import Image from "next/image";
import BookmarkFlag from "../Icons/BookmarkFlag";
import { BsBookmarkPlus, BsBookmarkDash } from 'react-icons/bs';
import EditClipboardIcon from "../Icons/EditClipboardIcon";
import { useRef } from "react";

interface ArticleButtonMobileProps {
  imageURL: string;
  headline: string;
  summary: string;
  url: string;
  bookmarked: boolean;
  addTopicsCallback: () => void;
  toggleBookmarkCallback: () => void;
}

export default function ArticleButtonMobile({ imageURL, headline, summary, url, bookmarked, addTopicsCallback, toggleBookmarkCallback }: ArticleButtonMobileProps) {
  const mainArticleRef = useRef<HTMLElement | null>(null);
  const topLevelRef = useRef<HTMLDivElement | null>(null);
  const underButtonRef = useRef<HTMLButtonElement | null>(null);
  let initTranslateX = 0;
  let startingPoint = 0;
  let maxOpenWidth = 0;
  let isDragging = false;
  let resistanceFactor = 0.01;

  function getTranslateX(element: HTMLElement) {
    const computedStyle = window.getComputedStyle(element);
    const transform = computedStyle.getPropertyValue('transform');
    const matrix = new DOMMatrix(transform);
    return matrix.e; // translateX
  }

  function handleMouseDown(e: any) {
    if (mainArticleRef.current && topLevelRef.current) {
      isDragging = true;
      mainArticleRef.current.addEventListener('pointermove', handleMouseMove);
      mainArticleRef.current.addEventListener('pointerup', handleMouseUp);
      mainArticleRef.current.addEventListener('pointerleave', handleMouseUp);
      initTranslateX = getTranslateX(topLevelRef.current);
      startingPoint = e.pageX;
      maxOpenWidth = mainArticleRef.current.offsetWidth * 0.2;
      topLevelRef.current!.style.transition = 'none';
      underButtonRef.current!.style.transition = 'none';
    }
  }

  function handleMouseUp() {
    let underButtonRest = 0;
    isDragging = false;
    if (mainArticleRef.current && topLevelRef.current) {
      mainArticleRef.current.removeEventListener('pointermove', handleMouseMove);
      mainArticleRef.current.removeEventListener('pointerleave', handleMouseUp);
      mainArticleRef.current.removeEventListener('pointerup', handleMouseUp);
      let whereToRest = 0;
      const endTranslateX = getTranslateX(topLevelRef.current);
      if (endTranslateX > maxOpenWidth) {
        whereToRest = maxOpenWidth;
        underButtonRest = maxOpenWidth + 10;
      } else {
        whereToRest = 0;
      }
      requestAnimationFrame(() => {
        topLevelRef.current!.style.transition = "transform 200ms ease-in";
        underButtonRef.current!.style.transition = "width 205ms ease-in";
        topLevelRef.current!.style.transform = `translate3d(${whereToRest}px,0,0)`;
        underButtonRef.current!.style.width = `${underButtonRest}px`;
      });
    }
  }

  function handleMouseMove(e: MouseEvent) {
    if (isDragging) {
      e.preventDefault();

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


  function handleBookmarkToggle() {
    topLevelRef.current!.addEventListener('transitionend', () => {
      toggleBookmarkCallback();
    }, { once: true });
  }

  return (
    <article
      onPointerDown={handleMouseDown}
      onClick={(e) => {
        if (topLevelRef.current) {
          if (getTranslateX(topLevelRef.current) === 0) {
            e.stopPropagation();
            window.open(url, "_blank", "noopener noreferrer");
          }
        }
      }}
      ref={mainArticleRef} className="article_mobile_base">
      <div ref={topLevelRef} className="top_level_wrapper">
        <div className="bookmark_flag_wrap"><BookmarkFlag selected={bookmarked} /></div>
        <div className="article_mobile_content-left">
          <div className="article_mobile_content-left--top">
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
          <div className="article_mobile_content-left--bottom">
            <summary>{summary}</summary>
          </div>
        </div>
        <div className="article_mobile_content-right">
          <div className="article_mobile_content-right--icon_button">
            <EditClipboardIcon callback={addTopicsCallback} />
          </div>
        </div>
      </div>
      <button
        onClick={handleBookmarkToggle}
        ref={underButtonRef} className={`under_button${bookmarked ? " bookmarked" : ""}`}>
        <div className="under_button__svg_wrapper">
          {bookmarked ? <BsBookmarkDash /> : <BsBookmarkPlus />}
        </div>
      </button>
    </article>
  );
}