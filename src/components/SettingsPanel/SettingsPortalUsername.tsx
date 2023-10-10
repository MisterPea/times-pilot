import { useState } from "react";
import PrimarySecondaryButtonsHTML from "../PrimarySecondaryButtonsHTML/PrimarySecondaryButtonsHTML";
import TextInput from "../TextInput/TextInput";
import TextInputStaticMock from "./SettingsInputLabel";
import SettingsPortalBlank from "./SettingsPortalBlank";

interface SettingsPortalUsernameProps {
  currentUsername: string;
}

export default function SettingsPortalUsername({ currentUsername }: SettingsPortalUsernameProps) {
  const [validInput, setValidInput] = useState<boolean>(false);

  function handleSubmitNewUsername() { }
  function handleBackNav() { }
  const escapePeriods = () => currentUsername.replace('.','\\.')

  return (
    <SettingsPortalBlank headline="Let's Update Your Username." backCallback={() => { }}>
      <TextInputStaticMock label="Current Username" content={currentUsername} />
      <TextInput label="New Username" type="text" regexTest={`^(?!${escapePeriods()}).{3,}$`} validInputCallback={setValidInput}/>
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