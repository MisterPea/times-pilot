import AutoSave from "../AutoSave/AutoSave";
import Label from "../Label/Label";
import ToggleGroup from "../ToggleGroup/ToggleGroup";
import potentialSections from "../../helpers/newsSections";
import { useState, useRef, useContext } from "react";
import { AuthContext } from "../../db/Auth";

interface SettingsSelectionsSelectProps {
  sectionsSelected: string[] | undefined;
}

export default function SettingsSelectionsSelect({ sectionsSelected }: SettingsSelectionsSelectProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errorSaving, setErrorSaving] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<{ getValue: () => string[] | null; }>(null);
  const chosenSections = () => sectionRef.current?.getValue() ?? [];
  const { updateRootSections } = useContext(AuthContext);

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

  async function handleSectionSave() {
    if (!updateRootSections) {
      return;
    }
    setIsSaving(true);
    setErrorSaving(false);
    try {
      await updateRootSections(chosenSections());
      isSaved(true);
    } catch (error) {
      isSaved(false);
    }
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
          potentialSelections={Object.keys(potentialSections)}
          previousSelections={sectionsSelected!}
          autoSaveCallback={handleAutoSaveTimeout}
          ref={sectionRef} />
      </div>
    </div>
  );
}