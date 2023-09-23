interface BookmarkedArticleProps {
  date: string;
  headline: string;
  summary: string;
  linkToArticle: string;
  deleteCallback: () => void;
}

export default function BookmarkedArticle({ headline, summary, date, linkToArticle, deleteCallback }: BookmarkedArticleProps) {

  function handleDelete() { }

  return (
    <article className="bookmarked_article">
      <div className="bookmarked_article--undo_overlay">

      </div>
      <div className="bookmarked_article--text_content">
        <p className="date">{date}</p>
        <h2>{headline}</h2>
        <p>{summary}</p>
      </div>
      <div className="bookmarked_article--control">
        <button onClick={handleDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M15 3V4H20V6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4V4H9V3H15ZM7 19H17V6H7V19ZM9 8H11V17H9V8ZM15 8H13V17H15V8Z" fill="white" />
          </svg>
        </button>
      </div>
    </article>
  );
}