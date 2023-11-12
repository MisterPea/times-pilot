import { useState, useRef } from "react";
import Label from "../Label/Label";
import MainButtonHTML from "../MainButtonHTML/MainButtonHTML";
import ModalBlank from "../Modals/ModalBlank";
import ToggleGroup from "../ToggleGroup/ToggleGroup";

interface AddTopicsModalProps {
  title: string;
  currentTopics: string[];
  savedTopics: string[];
  emailActive: boolean;
  closeModal?: () => void;
  updateEmailTopics: (values: string[]) => void;
  uid: string | null | undefined;
}

export default function AddTopicsModal({ title, currentTopics, savedTopics, emailActive, closeModal, updateEmailTopics, uid }: AddTopicsModalProps) {
  const [validInput, setValidInput] = useState<boolean>(false);
  const toggleGroupRef = useRef<{ getValue: () => string[]; } | null>(null);
  const toggleValues = () => toggleGroupRef.current?.getValue() || [];

  function handleTopicsUpdate() {
    const sortedToggleValues = JSON.stringify(toggleValues().sort((a, b) => a.localeCompare(b)));
    const sortedSavedTopic = JSON.stringify(savedTopics.sort((a, b) => a.localeCompare(b)));
    if (sortedSavedTopic !== sortedToggleValues) {
      setValidInput(true);
    } else {
      setValidInput(false);
    }
  }

  function handleAddTopic() {
    const updatedValues = toggleValues();
    updateEmailTopics(updatedValues);
    handleCloseDestination();
  }

  function handleCloseDestination() {
    closeModal && closeModal();
  }

  return (
    <ModalBlank closeDestination={handleCloseDestination}>
      {!uid && (<div className="no_account_cta">
        <div className="no_account_cta-wrap">
          <h5>Get the most out of Times Pilot by signing up!</h5>
          <p>Register now to personalize your topics, save your favorites, and get a daily digest of your chosen content delivered straight to your inbox. Start your tailored experience today.</p>
        </div>
      </div>)}
      <header className="modal_add_topics-header">
        <Label label="Topics Related to:" size="sm" />
        <h1>{title}</h1>
        <p className='modal_add_topics-header-cta'>Would you like to add some topics to your daily email subscription?</p>
      </header>

      <div className='modal_add_topics-toggle_wrap'>
        <ToggleGroup
          potentialSelections={currentTopics}
          previousSelections={savedTopics}
          ref={toggleGroupRef}
          autoSaveCallback={handleTopicsUpdate}
        />
      </div>
      <div className='modal_add_topics-button_wrap'>
        <MainButtonHTML
          label="Update Email Topics"
          linkCallback={handleAddTopic}
          disabled={!validInput}
        />
        {!emailActive && uid && <p>Your emails are currently paused!</p>}

      </div>
    </ModalBlank>
  );
}