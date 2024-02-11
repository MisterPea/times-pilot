/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import Label from "../Label/Label";
import PrimarySecondaryButtonsHTML from "../PrimarySecondaryButtonsHTML/PrimarySecondaryButtonsHTML";
import TextButtonHTML from "../TextButtonHTML/TextButtonHTML";
import TextInput from "../TextInput/TextInput";
import ModalBlank from "./ModalBlank";
import { AuthContext } from "../../db/Auth";
import ErrorWarn from "../ErrorWarn/ErrorWarn";

interface ModalNewAcct_OneProps {
  returnToSignIn: () => void;
  closeModalToBrowse: () => void;
  userNameRef: MutableRefObject<string>;
  closeModalToNext: () => void;
}

export default function ModalNewAcctOne({ returnToSignIn, closeModalToBrowse, userNameRef, closeModalToNext }: ModalNewAcct_OneProps) {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { createUser } = useContext(AuthContext);

  useEffect(() => {
    function handleEnterToCreateAcct(e: KeyboardEvent) {
      if (e.key === "Enter") {
        if (disableButton === false && document.activeElement?.tagName === "INPUT") {
          handleSubmit();
        }
      }
    }
    document.addEventListener('keydown', handleEnterToCreateAcct);
    return () => {
      document.removeEventListener('keydown', handleEnterToCreateAcct);
    };

  }, [disableButton]);

  const validInputs = useRef<boolean[]>([false, false, false]);
  function allInputsValid(inputIndex: number, value: boolean) {
    validInputs.current[inputIndex] = value;
    if (validInputs.current.every((e) => e === true)) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }

  const createErrorMsg = (message: string) => {
    if (message === 'auth/email-already-in-use') {
      return 'Email is Already in Use';
    }
    return 'There Was An Issue Creating Your Account';
  };

  async function handleSubmit() {
    if (!createUser) {
      return;
    }
    try {
      setIsBusy(true);
      userNameRef.current = userName;
      await createUser(email, password, userName);
      closeModalToNext();
    } catch (error: any | { message: string; }) {
      setErrorMsg(error.message);
      setIsBusy(false);
      setIsError(true);
    }
  }

  function handleBackToSignIn() {
    returnToSignIn();
  }

  function handleBrowse() {
    closeModalToBrowse();
  }

  return (
    <ModalBlank closeDestination={handleBackToSignIn}>
      <div className="modal_main_new_acct">
        <div className="modal_main_new_acct-headline_wrap">
          <Label label="Let's Try A New Account on for Size." size="md" />
        </div>
        <ErrorWarn errorMsg={createErrorMsg.call(null, errorMsg)} isError={isError} watchArray={[userName, email, password]} setIsError={setIsError} />
        <div className="modal_main_new_acct-input_wrap">
          <div className="modal_main_new_acct-input_wrap-inputs">
            <TextInput label="Username" type="text" regexTest="(.){3}" parentSetState={setUserName} validInputCallback={(bool) => allInputsValid.call(null, 0, bool)} />
            <TextInput label="Email" type="email" regexTest="email" parentSetState={setEmail} validInputCallback={(bool) => allInputsValid.call(null, 1, bool)} autocomplete="email" />
            <TextInput label="Password" type="password" regexTest="password" parentSetState={setPassword} validInputCallback={(bool) => allInputsValid.call(null, 2, bool)} autocomplete="new-password" />
          </div>
          <ul className="modal_main_new_acct-input_wrap-instructions">
            <p>The password should have:</p>
            <li>at least 8 characters</li>
            <li>1 number</li>
            <li>1 capitalized letter</li>
          </ul>
        </div>
        <div className="modal_main_new_acct-lower_buttons">
          <PrimarySecondaryButtonsHTML
            primaryLabel="Create Account"
            primaryLink={handleSubmit}
            secondaryLabel="Back to Sign In"
            secondaryLink={handleBackToSignIn}
            disabled={disableButton}
            spinner
            isWorking={isBusy}
          />
          <TextButtonHTML label="I just want to browse around" link={handleBrowse} />
        </div>
      </div>
    </ModalBlank>
  );
}