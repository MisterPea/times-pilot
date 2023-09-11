/* eslint-disable react-hooks/exhaustive-deps */
import Toast from "./Toast";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface MakeToastProps {
  data: string;
  deploy: boolean;
  viewLength?: number;
  isError?: boolean;
  endDeploy: (newValue: boolean) => void;
}

/**
 * Toast component - Will display message at bottom of screen and will disappear on its own.
 * @param {string} props.data Message to be displayed
 * @param {boolean} props.deploy Boolean to deploy the toast
 * @param {number} props.viewLength Number of milliseconds the toast is deployed - 0 if you want it to never auto hide/remove @default: 5000ms
 * @param {boolean} props.isError Boolean to style the toast as an error @default: false
 * @param {(updateValue:boolean) => void} props.endDeploy Reference to setState used to deploy toast. Will allow auto reset of state.
 * @returns {JsxElement}
 */
export default function MakeToast({ data, deploy, viewLength = 5000, isError=false, endDeploy }: MakeToastProps) {
  const documentRef = useRef<Document | null>(null);
  const toastRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const [showToast, setShowToast] = useState<boolean>(false);

  // we use useEffect to give us document within Next.js
  useEffect(() => {
    if (documentRef.current === null) {
      documentRef.current = document;
    }

    // start showing toast if we're clean/pre-initialized
    if (deploy === true && toastRef.current === null) {
      createTempDiv();
    }
  }, [deploy]);

  useEffect(() => {
    if (showToast === false && toastRef.current) {
      closeTempDiv();
    }
  }, [showToast]);

  // Setup and deploy toast
  function createTempDiv() {
    const body = documentRef.current!.body;

    toastRef.current = documentRef.current!.createElement('div');
    toastRef.current.classList.add('toaster_base');
    body.insertBefore(toastRef.current, null);

    setShowToast(true);
    // We don't start timer on 0, as it turns off timer
    if (viewLength > 0) startTimer();
  }

  // Closing/cleanup sequence
  function closeTempDiv() {
    toastRef.current!.addEventListener('animationend', () => {
      toastRef.current!.remove();
      if (toastRef.current !== null) {
        toastRef.current = null;
      }
      setShowToast(false);
      endDeploy(false);
    }, { once: true });

    toastRef.current!.classList.add('close');
    clearTimer();
  }

  function startTimer() {
    timeoutRef.current = window.setTimeout(() => {
      closeTempDiv();
    }, viewLength);
  }

  function clearTimer() {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  return (<>{showToast && createPortal(<Toast message={data} isError={isError} closeCallback={closeTempDiv} />, toastRef.current!)}</>);
}