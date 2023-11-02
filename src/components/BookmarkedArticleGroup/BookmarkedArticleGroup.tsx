import { useState, useRef, useContext } from "react";
import BookmarkedArticle from "../BookmarkedArticle/BookmarkedArticle";
import Label from "../Label/Label";
import { Bookmark } from "../types";
import { AuthContext } from "../../db/Auth";

interface BookmarkGroupProps {
  bookmarks: Bookmark[];
}
export default function BookmarkedArticleGroup({ bookmarks }: BookmarkGroupProps) {
  const [localBookmarks, setLocalBookmarks] = useState<Bookmark[]>(bookmarks);
  const bookmarksRef = useRef<HTMLDivElement | null>(null);
  const { updateBookmarks } = useContext(AuthContext);

  function deleteListItem(id: string) {
    const bkmk_group = document.querySelector('.bookmark_group');
    const toRemove: HTMLLIElement | undefined | null = bkmk_group?.querySelector(`#${id}`);
    if (toRemove) {
      toRemove.style.maxHeight = "0px";
      toRemove.style.margin = "-1px 0";
      toRemove.addEventListener('transitionend', () => {
        setLocalBookmarks((s) => s.filter((elem) => elem.id !== id));
        updateBookmarks && updateBookmarks({ id });
      }, { once: true });
    }
  }

  function parseDate(dateString: string) {
    const monthAbbreviations = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
    const parsedDate = new Date(dateString);
    const year = parsedDate.getFullYear();
    const month = parsedDate.getMonth();
    const day = parsedDate.getDate();
    const monthAbbreviation = monthAbbreviations[month];
    const formattedDate = `${monthAbbreviation} ${day.toString().padStart(2, '0')} ${year}`;
    return formattedDate;
  }

  return (
    <div ref={bookmarksRef} className="bookmark_group">
      {localBookmarks.length === 0 && <div className="no_bookmarks"><Label label="You have no bookmarked articles." size="sm" /></div>}
      <ul>
        {localBookmarks.map(({ id, date, title, summary, url }) => (
          <li id={id} className="bookmark_group--element" key={id}>
            <BookmarkedArticle date={parseDate(date)} headline={title} summary={summary} id={id} linkToArticle={url} deleteCallback={deleteListItem} />
          </li>
        ))}
      </ul>
    </div>
  );
}