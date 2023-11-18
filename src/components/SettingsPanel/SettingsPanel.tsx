import Label from "../Label/Label";
import MainButtonHTML from "../MainButtonHTML/MainButtonHTML";
import SettingsAccount from "./SettingsAccount";
import SettingsBookmark from "./SettingsBookmarked";
import SettingsEmailSelect from "./SettingsEmailSelect";
import SettingsPortalBookmarks from "./SettingsPortalBookmarks";
import SettingsSelectionsSelect from "./SettingsSectionsSelect";
import SettingsPortalDeleteAcct from "./SettingsPortalDeleteAcct";
import { MdClose } from 'react-icons/md';
import { AuthContext } from "../../db/Auth";
import { useContext, useState } from "react";
import SettingsPortalUsername from "./SettingsPortalUsername";
import SettingsPortalEmail from "./SettingsPortalEmail";
import SettingsPortalPassword from "./SettingsPortalPassword";
import { AnimatePresence, motion } from "framer-motion";

export type AccountInfo = {
  uid: string | undefined | null,
  userName: string | undefined | null,
  email: string | undefined | null,
};

interface SettingsPanelProps {
  emailSubscriptions: string[];
  emailActive: boolean;
  accountInfo: AccountInfo;
  closeAction: () => void;
  toggleEmailActive: any;
}

type SettingsOverlays = null | 'bookmarks' | 'username' | 'password' | 'email' | 'deleteAcct';

export default function SettingsPanel({
  emailSubscriptions,
  emailActive,
  accountInfo,
  closeAction,
  toggleEmailActive }: SettingsPanelProps) {

  const { bookmarks, rootSections, logoutUser } = useContext(AuthContext);
  const [settingsOverlay, setSettingsOverlay] = useState<SettingsOverlays>(null);
  const [logoutBusy, setLogoutBusy] = useState<boolean>(false);
  const portalVariant = {
    initial: { opacity: 0, zIndex: 100 },
    animate: { opacity: 1, zIndex: 100 },
    exit: { opacity: 0, zIndex: 100 },
  };

  function handleCloseOverlay() {
    setSettingsOverlay(null);
  }

  function handleOpenOverlay(value: SettingsOverlays) {
    setSettingsOverlay(value);
  }

  async function handleLogout() {
    if (!logoutUser) {
      return;
    }
    setLogoutBusy(true);
    const { loggedOut } = await logoutUser();
    if (loggedOut) {
      closeAction();
    }
    setLogoutBusy(false);
  }

  return (
    <>
      <div className="settings_panel">
        <div>
          <AnimatePresence>
            {settingsOverlay === 'bookmarks' && <motion.div {...portalVariant}><SettingsPortalBookmarks bookmarks={bookmarks} backCallback={handleCloseOverlay} /></motion.div>}
            {settingsOverlay === 'username' && <motion.div {...portalVariant}><SettingsPortalUsername currentUsername={accountInfo.userName!} backCallback={handleCloseOverlay} /></motion.div>}
            {settingsOverlay === 'email' && <motion.div {...portalVariant}><SettingsPortalEmail currentEmail={accountInfo.email!} backCallback={handleCloseOverlay} /></motion.div>}
            {settingsOverlay === 'password' && <motion.div {...portalVariant}><SettingsPortalPassword backCallback={handleCloseOverlay} /></motion.div>}
            {settingsOverlay === 'deleteAcct' && <motion.div {...portalVariant}><SettingsPortalDeleteAcct username={accountInfo.userName!} backCallback={handleCloseOverlay} /></motion.div>}
          </AnimatePresence>
        </div>
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
        <SettingsSelectionsSelect sectionsSelected={rootSections} />
        <SettingsEmailSelect
          sectionsSelected={emailSubscriptions}
          potentialSelections={emailSubscriptions}
          emailActive={emailActive}
          toggleEmailActive={toggleEmailActive}
        />
        <SettingsAccount
          name={accountInfo.userName}
          email={accountInfo.email}
          passwordCallback={handleOpenOverlay.bind(null, 'password')}
          usernameCallback={handleOpenOverlay.bind(null, 'username')}
          emailCallback={handleOpenOverlay.bind(null, 'email')}
        />
        <MainButtonHTML label="Logout of the.times.pilot" linkCallback={handleLogout} spinner isWorking={logoutBusy} fullWidth />
        <MainButtonHTML label="Delete Account" linkCallback={setSettingsOverlay.bind(null, 'deleteAcct')} danger fullWidth />
      </div>
    </>
  );
}