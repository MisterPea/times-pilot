import { useRef, useState } from "react";
import Label from "../Label/Label";
import TextButtonHTML from "../TextButtonHTML/TextButtonHTML";
import ToggleGroup from "../ToggleGroup/ToggleGroup";
import ModalBlank from "./ModalBlank";
import MainButtonHTML from "../MainButtonHTML/MainButtonHTML";
import potentialSections from "../../helpers/newsSections"; // sections list

interface ModalNewAcctTwoProps {
  userName: string;
}
export default function ModalNewAcctTwo({ userName }: ModalNewAcctTwoProps) {
  const sectionRef = useRef<{ getValue: () => string[]; } | null>(null);
  const [showSelectAll, setShowSelectAll] = useState<boolean>(true);
  const [prevSelectionsTemp, setPrevSelectionsTemp] = useState<string[]>([]);
  const chosenSections = () => sectionRef.current?.getValue() ?? [];

  function getSectionValues() {
    if (chosenSections().length > 0) {
      setShowSelectAll(false);
    } else {
      setShowSelectAll(true);
    }
  }

  function selectAll() {
    if (showSelectAll) {
      for (let i = 0; i < potentialSections.length; i += 1) {
        setPrevSelectionsTemp((s) => [...s, potentialSections[i]]);
      }
    } else {
      setPrevSelectionsTemp([]);
    }
    setShowSelectAll((s) => !s);
  }

  function handleSubmit() {
    console.log(chosenSections());
  }

  return (
    // we should automatically submit upon close, if nothing is chosen, we should selectAll
    <ModalBlank closeDestination={handleSubmit}>
      <div className="modal_main_new_acct">
        <div className="modal_main_new_acct-headline_wrap">
          <Label label={`Everything Checks Out, ${userName}`} size="md" />
        </div>
        <div className="modal_main_new_acct-top_instructions">
          <p>Let&apos;s choose which sections will appear on your page. You can modify this in <span>Settings.</span></p>
        </div>
        <div className="modal_main_new_acct-selections_group">
          <div className="modal_main_new_acct-selections_group-text">
            <TextButtonHTML label={showSelectAll ? "Select All" : "Clear Selections"} link={selectAll} />
          </div>
          <div className="modal_main_new_acct-selections_group-sections">
            <ToggleGroup
              potentialSelections={potentialSections}
              previousSelections={prevSelectionsTemp}
              autoSaveCallback={getSectionValues}
              ref={sectionRef} />
          </div>
        </div>
        <div className="modal_main_new_acct-submit_button_wrap">
          <MainButtonHTML label="Make it so!" linkCallback={handleSubmit} disabled={showSelectAll} />
        </div>
      </div>
    </ModalBlank>
  );
}