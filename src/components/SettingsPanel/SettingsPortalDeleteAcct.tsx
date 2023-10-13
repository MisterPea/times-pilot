import { useState } from "react";
import PrimarySecondaryButtonsHTML from "../PrimarySecondaryButtonsHTML/PrimarySecondaryButtonsHTML";
import TextInput from "../TextInput/TextInput";
import TextInputStaticMock from "./SettingsInputLabel";
import SettingsPortalBlank from "./SettingsPortalBlank";

interface SettingsPortalEmailProps {
  username: string;
}

export default function SettingsPortalEmail({ username }: SettingsPortalEmailProps) {
  const [validInput, setValidInput] = useState<boolean>(false);

  function handleSubmitNewUsername() { }
  function handleBackNav() { }

  return (
    <SettingsPortalBlank headline={`Sorry to See You Go, ${username}!`} backCallback={() => { }}>
      <p className="settings_portal-delete_cta">To ensure this in not in error, type out <span>Delete My Account</span> below.</p>
      <TextInput label="Delete My Account" type="email" regexTest="Delete My Account" validInputCallback={setValidInput} />
      <div className="settings_portal-button_wrap">
        <PrimarySecondaryButtonsHTML
          primaryLink={handleSubmitNewUsername}
          primaryLabel="Delete My Account"
          secondaryLink={handleBackNav}
          primaryState='destructive'
          fullWidth
          disabled={validInput === false}
        />
      </div>
    </SettingsPortalBlank>
  );
}