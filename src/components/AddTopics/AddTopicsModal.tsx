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
}

export default function AddTopicsModal({ title, currentTopics, savedTopics, emailActive }: AddTopicsModalProps) {
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

  function handleAddTopic() { }

  return (
    <ModalBlank closeDestination={() => { }}>
      <header className="modal_add_topics-header">
        <Label label="Topics Related to:" size="sm" />
        <h1>{title}</h1>
        <p className="modal_add_topics-header-cta">Would you like to add some topics to your daily email subscription?</p>
      </header>
      <div className="modal_add_topics-toggle_wrap">
        <ToggleGroup
          potentialSelections={currentTopics}
          previousSelections={savedTopics}
          ref={toggleGroupRef}
          autoSaveCallback={handleTopicsUpdate}

        />
      </div>
      <div className="modal_add_topics-button_wrap">
        <MainButtonHTML
          label="Update Email Topics"
          linkCallback={handleAddTopic}
          disabled={!validInput}
        />
        {!emailActive && <p>Your emails are currently paused!</p>}
      </div>
    </ModalBlank>
  );
}