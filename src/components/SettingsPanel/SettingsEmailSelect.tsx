import AutoSave from "../AutoSave/AutoSave";
import Label from "../Label/Label";
import PauseEmailButton from "../PauseEmailButton/PauseEmailButton";
import ToggleGroup from "../ToggleGroup/ToggleGroup";
import { useState, useRef, useContext } from "react";
import { AuthContext } from "../../db/Auth";

interface SettingsEmailSelectProps {
  sectionsSelected: string[];
  potentialSelections: string[];
  emailActive: boolean;
  toggleEmailActive: () => void;
}

export default function SettingsEmailSelect({ sectionsSelected, potentialSelections, emailActive, toggleEmailActive }: SettingsEmailSelectProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errorSaving, setErrorSaving] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<{ getValue: () => string[] | null; }>(null);
  const chosenSections = () => sectionRef.current?.getValue() ?? [];
  const anySubs = potentialSelections.length > 0; // Are there subscriptions?
  const { updateSections } = useContext(AuthContext);

  // We're delaying the saving of changes to limit server calls
  function handleAutoSaveTimeout() {
    clearTimeout(timeoutRef.current ?? undefined);
    timeoutRef.current = setTimeout(handleSectionSave, 2000);
  }

  function isSaved(success: boolean) {
    if (!success) {
      setErrorSaving(true);
    }
    setIsSaving(false);
  }

  function handleSectionSave() {
    setIsSaving(true);
    setErrorSaving(false);
    updateSections && updateSections(chosenSections(), isSaved, true);
  }

  function handleActiveEmailToggle() {
    toggleEmailActive();
  }

  return (
    <div className="settings_block-sections">
      <div className="settings_block-sections-border" />
      <div className="settings_block-sections-header">
        <Label label="Email Subscriptions" size="smMd" />
        {anySubs && <AutoSave saving={isSaving} error={errorSaving} />}
      </div>
      <div className="settings_block-sections-cta">
        {anySubs && <Label label="These are the topics that are included in your daily emails." size="xSm" />}
        {!anySubs && <Label label="You haven't subscribed to any topics." size="xSm" />}
      </div>
      {anySubs && <div className="settings_block-sections-selector_group">
        <ToggleGroup
          potentialSelections={potentialSelections}
          previousSelections={sectionsSelected}
          autoSaveCallback={handleAutoSaveTimeout}
          ref={sectionRef} />
      </div>}
      {anySubs && <PauseEmailButton toggleState={handleActiveEmailToggle} isActive={emailActive} />}
    </div>
  );
}