import Label from "../Label/Label";
import MainButtonHTML from "../MainButtonHTML/MainButtonHTML";
import SettingsAccount from "./SettingsAccount";
import SettingsBookmark from "./SettingsBookmarked";
import SettingsEmailSelect from "./SettingsEmailSelect";
import SettingsPortalBookmarks from "./SettingsPortalBookmarks";
import SettingsSelectionsSelect from "./SettingsSectionsSelect";
import { MdClose } from 'react-icons/md';
import { AuthContext } from "../../db/Auth";
import { useContext, useState } from "react";

export type AccountInfo = {
  userName: string,
  email: string,
  password?: string,
};

interface SettingsPanelProps {
  sectionsSelected: string[];
  emailSubscriptions: string[];
  emailActive: boolean;
  accountInfo: AccountInfo;
  closeAction: () => void;
  toggleEmailActive: any;
}

type SettingsOverlays = null | 'bookmarks';

export default function SettingsPanel({
  sectionsSelected,
  emailSubscriptions,
  emailActive,
  accountInfo,
  closeAction,
  toggleEmailActive }: SettingsPanelProps) {

  const { bookmarks } = useContext(AuthContext);
  const [settingsOverlay, setSettingsOverlay] = useState<SettingsOverlays>(null);

  function handleCloseOverlay() {
    setSettingsOverlay(null);
  }

  function handleOpenOverlay(value: SettingsOverlays) {
    setSettingsOverlay(value);
  }

  return (
    <>
      <div className="settings_panel">
        {settingsOverlay === 'bookmarks' && <SettingsPortalBookmarks bookmarks={bookmarks} backCallback={handleCloseOverlay} />}
        <div className="settings_panel-close_button-wrap">
          <button
            className='close_button'
            onClick={closeAction}
          >
            <MdClose />
          </button>
        </div>
        <Label label={`${accountInfo.userName}'s Settings`} />
        <SettingsBookmark buttonClickAction={handleOpenOverlay.bind(null, 'bookmarks')} />
        <SettingsSelectionsSelect sectionsSelected={sectionsSelected} />
        <SettingsEmailSelect
          sectionsSelected={emailSubscriptions}
          potentialSelections={emailSubscriptions}
          emailActive={emailActive}
          toggleEmailActive={toggleEmailActive}
        />
        <SettingsAccount
          name={accountInfo.userName}
          email={accountInfo.email}
          passwordCallback={() => { }}
          usernameCallback={() => { }}
          emailCallback={() => { }}
        />
        <MainButtonHTML label="Delete Account" linkCallback={() => { }} danger fullWidth />
      </div>
    </>
  );
}