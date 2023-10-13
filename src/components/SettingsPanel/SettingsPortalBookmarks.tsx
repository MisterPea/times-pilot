import { useState } from "react";
import PrimarySecondaryButtonsHTML from "../PrimarySecondaryButtonsHTML/PrimarySecondaryButtonsHTML";
import TextInput from "../TextInput/TextInput";
import TextInputStaticMock from "./SettingsInputLabel";
import SettingsPortalBlank from "./SettingsPortalBlank";
import BookmarkedArticleGroup, { Bookmark } from "../BookmarkedArticleGroup/BookmarkedArticleGroup";

interface SettingsPortalBookmarksProps {
  bookmarks: Bookmark[];
}

export default function SettingsPortalBookmarks({ bookmarks }: SettingsPortalBookmarksProps) {
  const [validInput, setValidInput] = useState<boolean>(false);

  function handleSubmitNewUsername() { }
  function handleBackNav() { }

  return (
    <SettingsPortalBlank headline="These Are Your Bookmarked Articles." backCallback={() => { }}>
      <div className="settings_portal-bookmark_wrap">
        <BookmarkedArticleGroup bookmarks={bookmarks}/>
      </div>
    </SettingsPortalBlank>
  );
}