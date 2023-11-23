import { useEffect, useRef, useState } from "react";
import Label from "../Label/Label";
import PrimarySecondaryButtonsHTML from "../PrimarySecondaryButtonsHTML/PrimarySecondaryButtonsHTML";
import TextInput from "../TextInput/TextInput";
import ModalBlank from "./ModalBlank";
import TextButtonHTML from "../TextButtonHTML/TextButtonHTML";
import { AnimatePresence, motion } from 'framer-motion';

interface ModalPasswordProps {
  returnToSignIn: () => void;
  createAccount: () => void;
}

export default function ModalPassword({ returnToSignIn, createAccount }: ModalPasswordProps) {
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const clickRef = useRef<HTMLButtonElement | null>(null);
  const [initialLabelHeight, setInitialLabelHeight] = useState(0);
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
    // Calculate the initial height of the initial-label
    const initialLabelElement = document.querySelector('.headline_wrap--initial');
    if (initialLabelElement) {
      setInitialLabelHeight(initialLabelElement.clientHeight);
    }
    
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
    // console.log("HANDLE EMAIL SUBMIT:",);
    setSubmit(true);
  }

  function handleReturnToSignIn() {
    returnToSignIn();
  }

  function handleCreateAccount() {
    createAccount();
  }

  return (
    <ModalBlank closeDestination={handleReturnToSignIn}>
      <div className="headline_wrap">
        <AnimatePresence mode="wait" initial={false}>
          {submit ? (
            <motion.div
              key="submit-label"
              layout
              initial={{ opacity: 0, height: initialLabelHeight }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: initialLabelHeight }}
              transition={{
                duration: 0.3,
                ease: [.6, .36, .11, .97],
              }}
              className="headline_wrap--submit">
              <Label label={text.headline.submit} size="md" />
              <div className="headline_wrap-cta_text">
                <Label label={text.body.submit} size="sm" />
              </div>
              <div className="headline_wrap-back_btn">
                <TextButtonHTML label="Back to sign in" link={handleReturnToSignIn} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="initial-label"
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "fit-content" }}
              exit={{ opacity: 0, height: initialLabelHeight }}
              transition={{
                duration: 0.3,
                ease: [.6, .36, .11, .97],
              }}
              className="headline_wrap--initial"
            >
              <Label label={text.headline.initial} size="md" />
              <div className="headline_wrap-cta_text">
                <Label label={text.body.initial} size="sm" />

              </div>
              <TextInput label="Email" regexTest="email" validInputCallback={setValidEmail} />
              <div className="headline_wrap-submit_btn">
                <PrimarySecondaryButtonsHTML
                  primaryLabel="Submit"
                  secondaryLabel="Sign In"
                  primaryLink={handleEmailSubmit}
                  secondaryLink={handleReturnToSignIn}
                  fullWidth={false}
                  disabled={!validEmail}
                  primaryOutsideClickRef={clickRef}
                />
              </div>
              <button
                onClick={handleCreateAccount}
                className="create_acct_button">
                <p>Don&apos;t have an account? <span>Create an account</span></p>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ModalBlank>
  );
}