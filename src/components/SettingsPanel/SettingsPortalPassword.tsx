import { useContext, useState } from "react";
import PrimarySecondaryButtonsHTML from "../PrimarySecondaryButtonsHTML/PrimarySecondaryButtonsHTML";
import TextInput from "../TextInput/TextInput";
import SettingsPortalBlank from "./SettingsPortalBlank";
import { AuthContext } from "../../db/Auth";
import ErrorWarn from "../ErrorWarn/ErrorWarn";

interface SettingsPortalEmailProps {
  backCallback: () => void;
}

export default function SettingsPortalPassword({ backCallback }: SettingsPortalEmailProps) {
  const { updateUserPassword } = useContext(AuthContext);
  const [currValidPW, setCurrValidPW] = useState<boolean>(false);
  const [newValidPW1, setNewValidPW1] = useState<boolean>(false);
  const [newValidPW2, setNewValidPW2] = useState<boolean>(false);

  const [currPassword, setCurrPassword] = useState<string>('');
  const [newPassword1, setNewPassword1] = useState<string>('');
  const [newPassword2, setNewPassword2] = useState<string>('');

  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  async function handleSubmitNewPassword() {
    if (updateUserPassword) {
      setIsSubmitted(true);
      try {
        await updateUserPassword(newPassword1, currPassword);
        handleBackNav();
      } catch (error: any | { message: string; }) {
        setIsError(true);
        setErrorMsg(error.message);
        setIsSubmitted(false);
      }
    }
  }

  function handleBackNav() {
    backCallback();
  }

  const createErrorMsg = (message: string) => {
    if (message === 'auth/wrong-password') {
      return 'It looks like you current password is incorrect';
    }
    return 'There Was An Issue Changing Your Password';
  };

  function resetError() {
    setIsError(false);
  }

  return (
    <SettingsPortalBlank headline="Let's Change Your Password." backCallback={handleBackNav}>
      <ErrorWarn isError={isError} errorMsg={createErrorMsg(errorMsg)} setIsError={resetError} watchArray={[currPassword, newPassword1, newPassword2]} />
      <div className="settings_portal--input_wrap">
        <div className="settings_portal-input_element">
          <TextInput
            label="Current Password"
            type="password"
            regexTest="password"
            parentSetState={setCurrPassword}
            validInputCallback={setCurrValidPW} />
        </div>
        <div className="settings_portal-input_bottom_wrap">
          <div className="settings_portal-input_element">
            <TextInput
              label="New Password"
              type="password"
              regexTest="password"
              parentSetState={setNewPassword1}
              validInputCallback={setNewValidPW1} />
          </div>
          <div className="settings_portal-input_element">
            <TextInput
              label="Confirm New Password"
              type="password"
              regexTest="password"
              parentSetState={setNewPassword2}
              validInputCallback={setNewValidPW2} />
          </div>
        </div>
      </div>
      <div className="settings_portal-button_wrap">
        <PrimarySecondaryButtonsHTML
          primaryLink={handleSubmitNewPassword}
          secondaryLink={handleBackNav}
          disabled={!(currValidPW && newValidPW1 && newValidPW2 && (newPassword1 === newPassword2))}
          spinner={true}
          isWorking={isSubmitted}
        />
      </div>
    </SettingsPortalBlank>
  );
};