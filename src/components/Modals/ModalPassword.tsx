import { useEffect, useRef, useState } from "react";
import Label from "../Label/Label";
import PrimarySecondaryButtonsHTML from "../PrimarySecondaryButtonsHTML/PrimarySecondaryButtonsHTML";
import TextInput from "../TextInput/TextInput";
import ModalBlank from "./ModalBlank";
import TextButtonHTML from "../TextButtonHTML/TextButtonHTML";

export default function ModalPassword() {
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const topFrameRef = useRef<HTMLDivElement | null>(null);
  const [submit, setSubmit] = useState<boolean>(false);
  const clickRef = useRef<HTMLButtonElement | null>(null);

  const text = {
    headline: {
      initial: "Can't Recall Your Password?",
      submit: "We're on it!",
    },
    body: {
      initial: "Enter the email address tied to your account",
      submit: "Check your inbox for info on resetting your password."
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  function handleKeydown(key: KeyboardEvent) {
    if (key.code === "Enter") {
      if (document.activeElement?.tagName === 'INPUT') {
        clickRef.current?.click();
      }
    }
  }

  function handleEmailSubmit() {
    console.log("HANDLE EMAIL SUBMIT:",);
    setSubmit(true);

  }

  function handleReturnToSignIn() {
    console.log('RETURN TO SIGN IN');
  }

  return (
    <ModalBlank closeDestination={handleReturnToSignIn}>
      <div className={`modal_password_wrap${submit ? " submit" : ""}`}>
        <div className="top_frame" ref={topFrameRef}>
          <div className="headline_wrap">
            <Label label={text.headline[submit ? "submit" : "initial"]} size="md" />
          </div>
          <Label label={text.body[submit ? "submit" : "initial"]} size="sm" />
        </div>
        <div className="button_on_submit">
          <TextButtonHTML label="Back to sign in" link={handleReturnToSignIn} />
        </div>
        <div className="bottom_frame">
          <TextInput label="Email" regexTest="email" validInputCallback={setValidEmail} />
          <div className="bottom_frame-inner">
            <PrimarySecondaryButtonsHTML
              primaryLabel="Submit"
              secondaryLabel="Sign In"
              primaryLink={handleEmailSubmit}
              secondaryLink={handleReturnToSignIn}
              fullWidth={false}
              disabled={!validEmail}
              primaryOutsideClickRef={clickRef}
            />
            <button className="create_acct_button">
              <p>Don&apos;t have an account? <span>Create an account</span></p>
            </button>
          </div>
        </div>
      </div>
    </ModalBlank>
  );
}