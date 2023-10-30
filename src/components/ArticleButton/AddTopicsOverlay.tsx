/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from "react";
import AddTopicsModal from "../AddTopics/AddTopicsModal";
import { createPortal } from "react-dom";

interface AddTopicsOverlayProps {
  children: any;
  showModal: boolean;
  title: string;
  topics: string[];
  closeOverlay: any;
}
export default function AddTopicsOverlay({ children, showModal, title, topics, closeOverlay }: AddTopicsOverlayProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const innerDivRef = useRef<HTMLDivElement | null>(null);
  const listenerRef = useRef<EventListener | null>(null);
  const documentRef = useRef<Document | null>(null);
  const tempDivRef = useRef<HTMLDivElement | undefined>(undefined);
  const [deployModal, setDeployModal] = useState<boolean>(false);

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
          setDeployModal(false)
        }, { once: true });
        overlayRef.current.classList.add('hide');
        innerDivRef.current.classList.add('hide');
      }
    }
  }

  return (
    <>
      {(deployModal && tempDivRef.current) && createPortal(
        <>
          <div ref={innerDivRef} className="add_topics_overlay-inner show">
            <AddTopicsModal
              title={title}
              currentTopics={topics}
              savedTopics={[]}
              emailActive={true}
              closeModal={handleCloseModal}
            />
          </div>
          <div ref={overlayRef} className="add_topics_overlay show" />
        </>
        , tempDivRef.current)}
      {children}
    </>
  );
}