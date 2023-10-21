/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from "react";
import AddTopicsModal from "../AddTopics/AddTopicsModal";

interface AddTopicsOverlayProps {
  children: any;
  showModal: boolean;
  title: string;
  topics: string[];
  closeOverlay: any;
}
export default function AddTopicsOverlay({ children, showModal, title, topics, closeOverlay }: AddTopicsOverlayProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const listenerRef = useRef<EventListener | null>(null);

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  function handleEscapeKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  }

  function handleCloseModal() {
    if (listenerRef.current === null) {
      if (overlayRef.current) {
        overlayRef.current.addEventListener('animationend', closeOverlay, { once: true });
        overlayRef.current.classList.add('hide');
      }
    }
  }


  return (
    <>
      {showModal && <div ref={overlayRef} className="add_topics_overlay show">
        <div className="add_topics_overlay-inner">
          <AddTopicsModal
            title={title}
            currentTopics={topics}
            savedTopics={[]}
            emailActive={true}
            closeModal={handleCloseModal}
          />
        </div>
      </div>}
      {children}
    </>
  );
}