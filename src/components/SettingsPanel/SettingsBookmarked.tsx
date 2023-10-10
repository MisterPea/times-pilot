import Label from "../Label/Label";
import MainButtonHTML from "../MainButtonHTML/MainButtonHTML";

interface SettingsBookmarkProps {
  buttonClickAction: () => void;
}

export default function SettingsBookmark({ buttonClickAction }: SettingsBookmarkProps) {
  return (
    <div className="settings_block-sections">
      <div className="settings_block-sections-border" />
      <Label label="Bookmarked Articles" size="smMd" />
      <div className="settings_block-sections-center_button">
        <MainButtonHTML label="View Saved Articles" linkCallback={buttonClickAction} />
      </div>
    </div>
  );
}