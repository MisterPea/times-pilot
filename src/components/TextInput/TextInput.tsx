/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { BiShowAlt, BiHide } from 'react-icons/bi';

interface TextInputProps {
  type?: "email" | "text" | "password";
  label: string;
  regexTest?: "email" | "password" | string;
  parentSetState?: (newValue: string) => void;
  foundError?: boolean;
  errorText?: string;
}

// Default regular expressions
const regex = {
  email: /[a-z0-9.]*@[a-z]*\.[a-z.]*[a-z]{2,}/,
  password: /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/g
};

export default function TextInput({ type = "text", label, parentSetState, regexTest, foundError, errorText }: TextInputProps) {
  const [localInputVal, setLocalInputValue] = useState<string>('');
  const [hasValidInput, setHasValidInput] = useState<boolean>(false);
  const [localError, setLocalError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  // Logic to test the text inputs
  function testInput() {

    let appliedRegex = regex[regexTest] || new RegExp(regexTest!);

    const isValid = appliedRegex.test(localInputVal);
    // console.log(appliedRegex.test(localInputVal),hasValidInput, isValid);
    setHasValidInput(isValid);
  }

  return (
    <div className="text_input">
      <label className={`${localInputVal.length ? 'has-input' : ''}${localError ? 'error' : ''}`}>{label}</label>
      {type === 'password' && <button onClick={() => setShowPassword((s) => !s)} className='show-password'>
        {showPassword ? <BiHide /> : <BiShowAlt />}
      </button>}
      <input
        type={showPassword ? 'text' : type}
        className={`${hasValidInput ? 'valid' : 'not-valid'}`}
        onChange={(e) => setLocalInputValue(e.target.value)}
        value={localInputVal}>
      </input>
      {errorText && <p className='error-text'>{errorText}</p>}
    </div>
  );
}