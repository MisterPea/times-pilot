import { useContext, useState } from "react";
import PrimarySecondaryButtonsHTML from "../PrimarySecondaryButtonsHTML/PrimarySecondaryButtonsHTML";
import TextInput from "../TextInput/TextInput";
import TextInputStaticMock from "./SettingsInputLabel";
import SettingsPortalBlank from "./SettingsPortalBlank";
import { AuthContext } from "../../db/Auth";
import ErrorWarn from "../ErrorWarn/ErrorWarn";

interface SettingsPortalEmailProps {
  currentEmail: string;
  backCallback: () => void;
}

export default function SettingsPortalEmail({ currentEmail, backCallback }: SettingsPortalEmailProps) {
  const { updateUserEmail } = useContext(AuthContext);
  const [validPasswordInput, setValidPasswordInput] = useState<boolean>(false);
  const [validEmailInput, setValidEmailInput] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  async function handleSubmitNewUsername() {
    if (updateUserEmail) {
      setIsSubmitted(true);
      try{
        await updateUserEmail(newEmail, password);
        handleBackNav();
      } catch(error:any|{message:string}){
        setIsError(true);
        setErrorMsg(error.message);
        setIsSubmitted(false);
      }
    }
  }

  function handleBackNav() {
    backCallback();
  }
  const regexString = `^(?!${currentEmail})[a-z0-9.]*@[a-z]*\.[a-z.]*[a-z]{2,}`;

  const createErrorMsg = (message: string) => {
    if (message === 'auth/email-already-in-use') {
      return 'Email is Already in Use';
    }
    return 'There Was An Issue Changing Your Email';
  };

  function resetError() {
    setIsError(false);
  }

  return (
    <SettingsPortalBlank headline="Let's Update Your Email." backCallback={handleBackNav}>
      <ErrorWarn isError={isError} errorMsg={createErrorMsg(errorMsg)} setIsError={resetError} watchArray={[password, newEmail]} />
      <TextInputStaticMock label="Current Email" content={currentEmail} />
      <div className="settings_portal--input_wrap">
        <div className="settings_portal-input_element">
          <TextInput
            label="Current Password"
            type="password"
            regexTest="password"
            parentSetState={setPassword}
            validInputCallback={setValidPasswordInput} 
            autocomplete="current-password"
            />
        </div>
        <div className="settings_portal-input_element">
          <TextInput
            label="New Email"
            type="email"
            regexTest={regexString}
            parentSetState={setNewEmail}
            validInputCallback={setValidEmailInput} />
        </div>
      </div>
      <div className="settings_portal-button_wrap">
        <PrimarySecondaryButtonsHTML
          primaryLink={handleSubmitNewUsername}
          secondaryLink={handleBackNav}
          disabled={!(validEmailInput && validPasswordInput)}
          spinner={true}
          isWorking={isSubmitted}
        />
      </div>
    </SettingsPortalBlank>
  );
};