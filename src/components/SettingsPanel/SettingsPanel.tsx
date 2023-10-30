import Label from "../Label/Label";
import MainButtonHTML from "../MainButtonHTML/MainButtonHTML";
import SettingsAccount from "./SettingsAccount";
import SettingsBookmark from "./SettingsBookmarked";
import SettingsEmailSelect from "./SettingsEmailSelect";
import SettingsSelectionsSelect from "./SettingsSectionsSelect";
import { MdClose } from 'react-icons/md';


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
}

export default function SettingsPanel({ sectionsSelected, emailSubscriptions, emailActive, accountInfo, closeAction }: SettingsPanelProps) {
  return (
    <div className="settings_panel">
      <div className="settings_panel-close_button-wrap">
        <button
          className='close_button'
          onClick={closeAction}
        >
          <MdClose />
        </button>
      </div>
      <Label label={`${accountInfo.userName}'s Settings`} />
      <SettingsBookmark buttonClickAction={() => { }} />
      <SettingsSelectionsSelect sectionsSelected={sectionsSelected} />
      <SettingsEmailSelect
        sectionsSelected={emailSubscriptions}
        potentialSelections={emailSubscriptions}
        emailActive={emailActive}
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
  );
}