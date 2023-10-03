import { useEffect, useRef, useState } from "react";
import Label from "../Label/Label";
import PrimarySecondaryButtonsHTML from "../PrimarySecondaryButtonsHTML/PrimarySecondaryButtonsHTML";
import TextButtonHTML from "../TextButtonHTML/TextButtonHTML";
import TextInput from "../TextInput/TextInput";
import ModalBlank from "./ModalBlank";

export default function ModalNewAcctOne() {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [disableButton, setDisableButton] = useState<boolean>(true);

  useEffect(() => {
    function handleEnterToCreateAcct(e: KeyboardEvent) {

      if (e.key === "Enter") {
        console.log("Enter Hit", disableButton, document.activeElement?.tagName);
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



  function handleSubmit() {
    console.log("SUBMITTED");
  }

  function handleBackToSignIn() {
    console.log("BACK TO SIGN IN");
  }

  function handleBrowse() {
    console.log("BROWSE");
  }

  return (
    <ModalBlank closeDestination={() => { }}>
      <div className="modal_main_new_acct">
        <div className="modal_main_new_acct-headline_wrap">
          <Label label="Let's Try A New Account on for Size." size="md" />
        </div>
        <div className="modal_main_new_acct-input_wrap">
          <div className="modal_main_new_acct-input_wrap-inputs">
            <TextInput label="Username" type="text" regexTest="(.){3}" parentSetState={setUserName} validInputCallback={(bool) => allInputsValid.call(null, 0, bool)} />
            <TextInput label="Email" type="email" regexTest="email" parentSetState={setEmail} validInputCallback={(bool) => allInputsValid.call(null, 1, bool)} />
            <TextInput label="Password" type="password" regexTest="password" parentSetState={setPassword} validInputCallback={(bool) => allInputsValid.call(null, 2, bool)} />
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
          />
          <TextButtonHTML label="I just want to browse around" link={handleBrowse} />
        </div>
      </div>
    </ModalBlank>
  );
}