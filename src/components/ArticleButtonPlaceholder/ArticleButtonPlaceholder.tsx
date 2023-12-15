export default function ArticleButtonPlaceholder() {
  return (
    <>
      <li className="article_placeholder">
      <div className="article_placeholder_wrapper">
        <div className="content_top_placeholder">
          <div className="content_top_placeholder-image gradient_animated"></div>
          <div className="content_top_placeholder-headline">
            <div className="content_top_placeholder-headline--line gradient_animated"></div>
            <div className="content_top_placeholder-headline--line gradient_animated"></div>
            <div className="content_top_placeholder-headline--line gradient_animated"></div>
          </div>
        </div>
        <div className="content_bottom_placeholder-summary">
          <div className="content_bottom_placeholder-summary--line gradient_animated"></div>
          <div className="content_bottom_placeholder-summary--line gradient_animated"></div>
          <div className="content_bottom_placeholder-summary--line gradient_animated"></div>
          <div className="content_bottom_placeholder-summary-button_holder">
            <div className="circle_button gradient_animated"></div>
            <div className="circle_button gradient_animated" />
          </div>
        </div>
      </div>
      <div className="circle_button_mobile gradient_animated"></div>
    </li >
    </>
  );
}