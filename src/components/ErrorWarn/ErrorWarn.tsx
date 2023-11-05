/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, useEffect } from "react";

interface ErrorWarnProps {
  isError: boolean;
  setIsError?: Dispatch<boolean> | ((value: boolean) => void);
  errorMsg: string;
  watchArray?: (string | boolean)[];
}

/**
 * Component to display a warning message. Pass in setIsEnter and watchArray if you want 
 * to close the warning when dependencies in the watch array change.
 * @param {boolean} props.isError Boolean on whether to show or hide component
 * @param {Dispatch<boolean>=} props.setIsError setState function called to reset error 
 * @param {string} props.errorMsg String of error message
 * @param {(string|boolean)[]=} props.watchArray Dependency array of elements to watch for change. A change of values in this array will trigger setIsError
 * @returns 
 */
export default function ErrorWarn({ isError, setIsError, errorMsg, watchArray }: ErrorWarnProps) {
  useEffect(() => {
    if (watchArray && isError) {
      setIsError && setIsError(false);
    }
  }, [ ...(watchArray || [])]);

  return (
    <div className={`modal-error_wrap${isError ? " error" : ""}`}>
      <p>{errorMsg}</p>
    </div>
  );
}

//     Mykbis-9vojty-qecsec