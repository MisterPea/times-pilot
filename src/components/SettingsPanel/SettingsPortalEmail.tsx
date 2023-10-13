import { useState } from "react";
import PrimarySecondaryButtonsHTML from "../PrimarySecondaryButtonsHTML/PrimarySecondaryButtonsHTML";
import TextInput from "../TextInput/TextInput";
import TextInputStaticMock from "./SettingsInputLabel";
import SettingsPortalBlank from "./SettingsPortalBlank";

interface SettingsPortalEmailProps {
  currentEmail: string;
}

export default function SettingsPortalEmail({ currentEmail }: SettingsPortalEmailProps) {
  const [validInput, setValidInput] = useState<boolean>(false);

  function handleSubmitNewUsername() { }
  function handleBackNav() { }
  const regexString = `^(?!${currentEmail})[a-z0-9.]*@[a-z]*\.[a-z.]*[a-z]{2,}`

  return (
    <SettingsPortalBlank headline="Let's Update Your Email." backCallback={() => { }}>
      <TextInputStaticMock label="Current Email" content={currentEmail} />
      <TextInput label="New Email" type="email" regexTest={regexString} validInputCallback={setValidInput}/>
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