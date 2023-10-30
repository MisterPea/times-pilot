/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, useContext } from "react";
import Label from "../Label/Label";
import PrimarySecondaryButtonsHTML from "../PrimarySecondaryButtonsHTML/PrimarySecondaryButtonsHTML";
import TextInput from "../TextInput/TextInput";
import ModalBlankHeadline from "./ModalBlankHeadline";
import { AuthContext } from '../../db/Auth';
import { Auth, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

interface ModalLoginProps {
  hasLoginError: boolean;
  closeModal: () => void;
  forgotPasswordCallback: () => void;
  createAccount: () => void;
}

/**
 * Modal Login
 * @param {Function} props.closeModal Function to be called from inside modal to close overlay and modal
 * @param {boolean} props.hasLoginError Boolean passed back in if auth returns an error related to username/password
 * 
 * @returns 
 */
export default function ModalLogin({ closeModal, hasLoginError, forgotPasswordCallback, createAccount }: ModalLoginProps) {
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [localLoginError, setLocalLoginError] = useState<boolean>(false);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    document.addEventListener('keydown', handleEnterClick);
    return () => {
      document.removeEventListener('keydown', handleEnterClick);
    };
  }, []);

  useEffect(() => {
    setLocalLoginError(hasLoginError);
  }, [hasLoginError]);

  useEffect(() => {
    if (localLoginError === true) {
      setLocalLoginError(false);
    }
  }, [emailValue, passwordValue]);

  function handleEnterClick(e: KeyboardEvent) {
    if (e.key === "Enter" && document.activeElement?.tagName === "INPUT") {
      if (!submitButtonRef.current?.classList.contains("disabled")) {
        /* We have to perform the click because of the scoping of this function.
           From this scope we can't see changes via useState */
        submitButtonRef.current?.click();
      }
    }
  }
  async function handleSubmit() {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
      closeModal();
    } catch (error) {
      //TODO: capture via logs: error.code, error.message
      setLocalLoginError(true);
    }
  }

  function handleForgotPassword() {
    forgotPasswordCallback();
  }

  function handleCreateAccount() {
    createAccount();
  }

  function handleCloseModal() {
    closeModal();
  }

  return (
    <ModalBlankHeadline closeDestination={handleCloseModal}>
      <div className="modal_login">
        <header>
          <Label
            label="Welcome back! Sign in to continue."
            size="xSm"
          />
        </header>
        <div className={`modal_login-error_wrap${localLoginError ? " error" : ""}`}>
          <p>Incorrect Username or Password</p>
        </div>
        <div className="modal_login-inputs">
          <TextInput type="email" regexTest="email" label="Email" validInputCallback={setValidEmail} parentSetState={(f) => setEmailValue(f)} />
          <TextInput type="password" regexTest="password" label="Password" validInputCallback={setValidPassword} parentSetState={setPasswordValue} />
        </div>
        <button onClick={handleForgotPassword} className="modal_login-forgot_password">Forgot Password?</button>
        <div className="modal_login-lower_group">
          <button onClick={handleCreateAccount} className="modal_login-create_acct">Don&apos;t have an account? <span>Create an account</span></button>
          <PrimarySecondaryButtonsHTML
            primaryLabel="Let's Go!"
            primaryLink={handleSubmit}
            secondaryLink={handleCloseModal}
            secondaryLabel="I just want to browse around"
            disabled={!(validEmail && validPassword)}
            primaryOutsideClickRef={submitButtonRef}
          />
        </div>
      </div>
    </ModalBlankHeadline>
  );
}