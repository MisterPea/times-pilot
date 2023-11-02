import SettingsPortalBlank from "./SettingsPortalBlank";
import BookmarkedArticleGroup from "../BookmarkedArticleGroup/BookmarkedArticleGroup";
import { Bookmark } from "../types";

interface SettingsPortalBookmarksProps {
  bookmarks: Bookmark[];
  backCallback: () => void;
}

export default function SettingsPortalBookmarks({ bookmarks, backCallback }: SettingsPortalBookmarksProps) {

  function handleBackButton(){
    backCallback()
  }

  return (
    <SettingsPortalBlank headline="These Are Your Bookmarked Articles." backCallback={handleBackButton}>
      <div className="settings_portal-bookmark_wrap">
        <BookmarkedArticleGroup bookmarks={bookmarks} />
      </div>
    </SettingsPortalBlank>
  );
}