/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState, useContext } from "react";
import AddTopicsModal from "../AddTopics/AddTopicsModal";
import { createPortal } from "react-dom";
import MakeToast from "../MakeToast/MakeToast";

interface AddTopicsOverlayProps {
  children: any;
  showModal: boolean;
  title: string;
  topics: string[];
  closeOverlay: any;
  subscriptions: string[];
  updateSections: ((sections: string[], completeCallback: (value: boolean) => void) => void) | undefined;
  emailActive: boolean;
  uid: string | null | undefined;
}
export default function AddTopicsOverlay({
  children,
  showModal,
  title,
  topics,
  closeOverlay,
  subscriptions,
  updateSections,
  emailActive,
  uid
}: AddTopicsOverlayProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const innerDivRef = useRef<HTMLDivElement | null>(null);
  const listenerRef = useRef<EventListener | null>(null);
  const documentRef = useRef<Document | null>(null);
  const tempDivRef = useRef<HTMLDivElement | undefined>(undefined);
  const [deployModal, setDeployModal] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastError, setToastError] = useState<boolean>(false);

  useEffect(() => {
    documentRef.current = document;
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  useEffect(() => {
    if (overlayRef.current && innerDivRef.current && showModal) {
      overlayRef.current.classList.remove('hide');
      innerDivRef.current.classList.remove('hide');
    }
    if (documentRef.current && showModal) {
      tempDivRef.current = documentRef.current.createElement('div');
      tempDivRef.current.classList.add('add_topics_overlay-outer');

      const body = documentRef.current.getElementById('__next');
      if (body) {
        body.insertBefore(tempDivRef.current, body.firstChild);
        setDeployModal(true);
      }
    }
  }, [showModal]);

  function handleEscapeKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  }

  function handleCloseModal() {
    if (listenerRef.current === null) {
      if (overlayRef.current && innerDivRef.current) {
        overlayRef.current.addEventListener('animationend', () => {
          closeOverlay();
          tempDivRef.current && tempDivRef.current.remove();
          tempDivRef.current = undefined;
          setDeployModal(false);
        }, { once: true });
        overlayRef.current.classList.add('hide');
        innerDivRef.current.classList.add('hide');
      }
    }
  }


  function updateComplete(success: boolean) {
    setToastError(!success);
    if (!success) {
      setToastMessage('There was an issue updating your topics');
    }
    setShowToast(true);
  }

  function getToastMessage(added: number, subtracted: number): string | null {
    let addedMessage, subtractedMessage;
    // 'added' message
    if (added === 1) {
      addedMessage = '1 topic was added';
    } else if (added > 1) {
      addedMessage = `${added} topics were added`;
    } else {
      addedMessage = null;
    }
    // 'subtracted' message
    if (subtracted === 1) {
      subtractedMessage = '1 topic was removed';
    } else if (subtracted > 1) {
      subtractedMessage = `${subtracted} topics were removed`;
    } else {
      subtractedMessage = null;
    }

    // Combined
    if (addedMessage && subtractedMessage) {
      return `${addedMessage} and ${subtractedMessage} from your subscription`;
    } else if (addedMessage) {
      return `${addedMessage} to your subscription`;
    } else {
      return `${subtractedMessage} from your subscription`;
    }
  }

  function handleUpdateAndReportTopics(sections: string[]) {
    const added = [...sections].filter((e) => !subscriptions.includes(e)).length;
    const subtracted = [...subscriptions].filter((e) => !sections.includes(e)).length;
    setToastMessage(getToastMessage(added, subtracted) || 'Topics added');
    updateSections && updateSections(sections, updateComplete);
  }

  return (
    <>
      <MakeToast data={toastMessage} deploy={showToast} endDeploy={setShowToast} isError={toastError} viewLength={6000} />
      {(deployModal && tempDivRef.current) && createPortal(
        <>
          <div ref={innerDivRef} className="add_topics_overlay-inner show">
            <AddTopicsModal
              title={title}
              currentTopics={topics}
              savedTopics={subscriptions}
              emailActive={emailActive}
              closeModal={handleCloseModal}
              updateEmailTopics={handleUpdateAndReportTopics}
              uid={uid}
            />
          </div>
          <div ref={overlayRef} className="add_topics_overlay show" />
        </>
        , tempDivRef.current)}
      {children}
    </>
  );
}