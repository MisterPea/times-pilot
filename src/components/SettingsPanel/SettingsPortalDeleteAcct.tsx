import { useContext, useState } from "react";
import PrimarySecondaryButtonsHTML from "../PrimarySecondaryButtonsHTML/PrimarySecondaryButtonsHTML";
import TextInput from "../TextInput/TextInput";
import SettingsPortalBlank from "./SettingsPortalBlank";
import { AuthContext } from "../../db/Auth";
import ErrorWarn from "../ErrorWarn/ErrorWarn";

interface SettingsPortalEmailProps {
  username: string;
  backCallback: () => void;
}

export default function SettingsPortalEmail({ username, backCallback }: SettingsPortalEmailProps) {
  const [validInput, setValidInput] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { deleteAccount } = useContext(AuthContext);

  async function handleDeleteAccount() {
    if (!deleteAccount) {
      return;
    }
    try {
      await deleteAccount(password);
      // close everything
    } catch (error) {
      setIsError(true);
    }
  }

  function handleBackNav() {
    backCallback();
  }

  return (
    <SettingsPortalBlank headline={`Sorry to See You Go, ${username}!`} backCallback={handleBackNav}>
      <p className="settings_portal-delete_cta">To ensure this action is not an error, enter your current password and then type out <span>Delete My Account</span> below.</p>
      <ErrorWarn isError={false} errorMsg="There was an issue deleting your account" />
      <div className="settings_portal-delete_input">
        <TextInput
          label="Current Password"
          type="password"
          regexTest="password"
          parentSetState={setPassword}
          validInputCallback={setValidPassword} 
          autocomplete="current-password"
          />
      </div>
      <TextInput label="Delete My Account" type="email" regexTest={/^Delete My Account$/} validInputCallback={setValidInput} />
      <div className="settings_portal-button_wrap">
        <PrimarySecondaryButtonsHTML
          primaryLink={handleDeleteAccount}
          primaryLabel="Delete My Account"
          secondaryLink={handleBackNav}
          primaryState='destructive'
          fullWidth
          disabled={!(validInput && validPassword)}
        />
      </div>
    </SettingsPortalBlank>
  );
}