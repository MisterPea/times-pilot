import { useContext, useState } from "react";
import PrimarySecondaryButtonsHTML from "../PrimarySecondaryButtonsHTML/PrimarySecondaryButtonsHTML";
import TextInput from "../TextInput/TextInput";
import TextInputStaticMock from "./SettingsInputLabel";
import SettingsPortalBlank from "./SettingsPortalBlank";
import { AuthContext } from "../../db/Auth";

interface SettingsPortalUsernameProps {
  currentUsername: string;
  backCallback: () => void;
}

export default function SettingsPortalUsername({ currentUsername, backCallback }: SettingsPortalUsernameProps) {
  const [validInput, setValidInput] = useState<boolean>(false);
  const [newUserName, setNewUserName] = useState<string>('');
  const { updateUserName } = useContext(AuthContext);

  function handleSubmitNewUsername() {
    updateUserName && updateUserName(newUserName);
    backCallback();
  }

  function handleBackNav() {
    backCallback();
  }

  const escapePeriods = () => currentUsername.replace('.', '\\.');

  return (
    <SettingsPortalBlank headline="Let's Update Your Username." backCallback={handleBackNav}>
      <TextInputStaticMock label="Current Username" content={currentUsername} />
      <TextInput label="New Username" type="text" parentSetState={setNewUserName} regexTest={`^(?!${escapePeriods()}).{3,}$`} validInputCallback={setValidInput} />
      <div className="settings_portal-button_wrap">
        <PrimarySecondaryButtonsHTML
          primaryLink={handleSubmitNewUsername}
          secondaryLink={handleBackNav}
          disabled={validInput === false}
        />
      </div>
    </SettingsPortalBlank>
  );
}