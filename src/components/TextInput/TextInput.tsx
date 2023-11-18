/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { BiShowAlt, BiHide } from 'react-icons/bi';

interface TextInputProps {
  type?: "email" | "text" | "password";
  label: string;
  regexTest?: "email" | "password" | string | RegExp;
  parentSetState?: (newValue: string) => void;
  foundError?: boolean;
  errorText?: string;
  validInputCallback?: (newValue: boolean) => void;
}

// Default regular expressions
const regexObj: { [key: string]: RegExp; } = {
  'email': /[a-z0-9.]*@[a-z]*\.[a-z.]*[a-z]{2,}/,
  'password': /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/g
};

export default function TextInput({
  type = "text",
  label,
  parentSetState,
  regexTest,
  foundError,
  errorText,
  validInputCallback
}: TextInputProps) {

  const [localInputVal, setLocalInputValue] = useState<string>('');
  const [hasValidInput, setHasValidInput] = useState<boolean>(false);
  const [localError, setLocalError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // We callback the local state to the parent.
  // We could forward the ref, but we would still have to manually call for an update.
  useEffect(() => {
    if (parentSetState) {
      parentSetState(localInputVal);
    }
    if (regexTest) {
      testInput();
    }
  }, [localInputVal]);

  // We can receive errors from a parent component
  useEffect(() => {
    if (foundError !== undefined) {
      foundError === true && setHasValidInput(false);
      setLocalError(foundError);
    }
  }, [foundError]);

  // Capture for Enter and Esc
  useEffect(() => {
    document.addEventListener('keydown', handleKeyFocusCheck);
    return () => {
      document.removeEventListener('keydown', handleKeyFocusCheck);
    };
  }, []);

  function handleKeyFocusCheck(key: KeyboardEvent) {
    document.activeElement === inputRef.current;
    if (key.code === 'Escape' && document.activeElement === inputRef.current) {
      inputRef.current?.blur();
    }
  }

  // Logic to test the text inputs
  function testInput() {
    let appliedRegex: RegExp = /^$/;
    if (typeof regexTest === 'string' && regexObj.hasOwnProperty(regexTest)) {
      appliedRegex = regexObj[regexTest];
    } else if (typeof regexTest === 'string') {
      appliedRegex = new RegExp(regexTest);
    } else if (regexTest instanceof RegExp) {
      appliedRegex = regexTest;
    }

    /*  This is resetting where we're searching from.
    When we get a true from .test it sets lastIndex to that index thats true.
    Subsequent entries will then alternate between true and false because 
    it's not testing from index 0  */
    appliedRegex.lastIndex = 0;
    const isValid = appliedRegex.test(localInputVal);
    setHasValidInput(isValid);
    if (validInputCallback) {
      validInputCallback(isValid);
    }
  }

  return (
    <div className="text_input">
      <label className={`${localInputVal.length ? 'has-input' : ''}${localError ? 'error' : ''}`}>{label}</label>
      {type === 'password' && <button tabIndex={-1} onClick={() => setShowPassword((s) => !s)} className='show-password'>
        {showPassword ? <BiHide /> : <BiShowAlt />}
      </button>}
      <input
        ref={inputRef}
        type={showPassword ? 'text' : type}
        className={`${hasValidInput ? 'valid' : 'not-valid'}`}
        onChange={(e) => setLocalInputValue(e.target.value)}
        value={localInputVal}>
      </input>
      {errorText && <p className='error-text'>{errorText}</p>}
    </div>
  );
}