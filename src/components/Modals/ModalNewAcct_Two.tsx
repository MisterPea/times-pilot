import { useRef, useState } from "react";
import Label from "../Label/Label";
import TextButtonHTML from "../TextButtonHTML/TextButtonHTML";
import ToggleGroup from "../ToggleGroup/ToggleGroup";
import ModalBlank from "./ModalBlank";
import MainButtonHTML from "../MainButtonHTML/MainButtonHTML";

interface ModalNewAcctTwoProps {
  userName: string;
}
export default function ModalNewAcctTwo({ userName }: ModalNewAcctTwoProps) {
  const sectionRef = useRef<{ getValue: () => string[]; } | null>(null);
  const potentialSections = ["Arts", "Automobiles", "Books", "Business", "Climate", "Cooking", "Education", "Fashion", "Food", "Health", "Home", "Jobs", "Magazine", "Movies", "National", "NY Region", "Obituaries", "Opinion", "Politics", "Real Estate", "Science", "Sports", "Sunday Review", "Technology", "Theater", "T-Mag", "Travel", "Upshot", "US", "World"];
  const [showSelectAll, setShowSelectAll] = useState<boolean>(true);
  const [prevSelectionsTemp, setPrevSelectionsTemp] = useState<string[]>([]);

  function getSectionValues() {
    const chosenSections = sectionRef.current?.getValue() ?? [];
    if (chosenSections?.length > 0) {
      setShowSelectAll(false);
    } else {
      setShowSelectAll(true)
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

  return (
    <ModalBlank closeDestination={getSectionValues}>
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
          <MainButtonHTML label="Make it so!" linkCallback={() => {}} disabled={showSelectAll}/>
        </div>
      </div>
    </ModalBlank>
  );
}