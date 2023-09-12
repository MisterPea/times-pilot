import { useEffect, useRef } from "react";

interface AutoSaveProps {
  saving: boolean;
  error: boolean;
}

export default function AutoSave({ saving, error }: AutoSaveProps) {
  const innerWrapRef = useRef<HTMLUListElement | null>(null);
  const isSavedRef = useRef<HTMLLIElement | null>(null);
  const savingRef = useRef<HTMLLIElement | null>(null);
  const errorRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (saving === true) {
      const savingTop = savingRef.current?.getBoundingClientRect().top;
      savingTop && updateMessage(savingTop, savingRef.current);
    } else if (error === true) {
      const errorTop = errorRef.current?.getBoundingClientRect().top;
      errorTop && updateMessage(errorTop, errorRef.current);
    } else {
      const isSavedTop = isSavedRef.current?.getBoundingClientRect().top;
      isSavedTop && updateMessage(isSavedTop, isSavedRef.current);
    }
  }, [saving, error]);


  function updateMessage(messageTop: number, reference: HTMLLIElement | null) {
    innerWrapRef.current?.querySelectorAll('.condition').forEach((e) => {
      if (e.classList !== reference?.classList) {
        if (e instanceof HTMLElement) { // cast e as HTMLElement
          e.style.opacity = "0";
          e.setAttribute("aria-hidden", "true");
        }
      } else {
        if (e instanceof HTMLElement) {
          e.style.opacity = "1";
          e.setAttribute("aria-hidden", "false");
        }
      }
    });

    const wrapTop = innerWrapRef.current?.getBoundingClientRect().top;
    const newTop = wrapTop && wrapTop - messageTop;
    innerWrapRef.current!.style.top = `${newTop}px`;
  }

  return (
    <div className="auto_save_base">
      <div className="auto_save_inner" aria-live="polite">
        <ul ref={innerWrapRef} className="auto_save_inner_wrapper">
          <li ref={isSavedRef} className="condition is-saved">• All Changes Saved</li>
          <li ref={savingRef} className="condition saving">• Saving...</li>
          <li ref={errorRef} className="condition error">• Changes Not Saved!</li>
        </ul>
      </div>
    </div>
  );
}