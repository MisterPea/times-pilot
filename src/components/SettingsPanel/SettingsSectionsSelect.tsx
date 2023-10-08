import AutoSave from "../AutoSave/AutoSave";
import Label from "../Label/Label";
import ToggleGroup from "../ToggleGroup/ToggleGroup";
import potentialSections from "../../helpers/newsSections";
import { useState, useRef } from "react";

interface SettingsSelectionsSelectProps {
  sectionsSelected: string[];
}

export default function SettingsSelectionsSelect({ sectionsSelected }: SettingsSelectionsSelectProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errorSaving, setErrorSaving] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<{ getValue: () => string[] | null; }>(null);
  const chosenSections = () => sectionRef.current?.getValue() ?? [];

  function handleAutoSaveTimeout() {
    clearTimeout(timeoutRef.current ?? undefined);
    timeoutRef.current = setTimeout(handleSectionSave, 2000);
  }

  function handleSectionSave() {
    ////////////////// Temporary //////////////////
    setIsSaving(true);                             
    console.log("SAVE CALLED", chosenSections());

    let id = setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  }

  return (
    <div className="settings_block-sections">
      <div className="settings_block-sections-border" />
      <div className="settings_block-sections-header">
        <Label label="Sections Selections" size="smMd" />
        <AutoSave saving={isSaving} error={errorSaving} />
      </div>
      <div className="settings_block-sections-cta">
        <Label label="Choose which sections appear on your page." size="xSm" />
      </div>
      <div className="settings_block-sections-selector_group">
        <ToggleGroup
          potentialSelections={potentialSections}
          previousSelections={sectionsSelected}
          autoSaveCallback={handleAutoSaveTimeout}
          ref={sectionRef} />
      </div>
    </div>
  );
}