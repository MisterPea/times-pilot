import { useContext, useRef, useState } from "react";
import Label from "../Label/Label";
import TextButtonHTML from "../TextButtonHTML/TextButtonHTML";
import ToggleGroup from "../ToggleGroup/ToggleGroup";
import ModalBlank from "./ModalBlank";
import MainButtonHTML from "../MainButtonHTML/MainButtonHTML";
import potentialSections from "../../helpers/newsSections"; // sections list
import { AuthContext } from '../../db/Auth';
import ErrorWarn from "../ErrorWarn/ErrorWarn";

interface ModalNewAcctTwoProps {
  userName: string;
  closeModal: () => void;
  closeModalToNext: () => void;
}
export default function ModalNewAcctTwo({ userName, closeModal, closeModalToNext }: ModalNewAcctTwoProps) {
  const sectionRef = useRef<{ getValue: () => string[]; } | null>(null);
  const [showSelectAll, setShowSelectAll] = useState<boolean>(true);
  const [prevSelectionsTemp, setPrevSelectionsTemp] = useState<string[]>([]);
  const chosenSections = () => sectionRef.current?.getValue() ?? [];
  const { updateRootSections } = useContext(AuthContext);
  const [submitBusy, setSubmitBusy] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  function getSectionValues() {
    if (chosenSections().length > 0) {
      setShowSelectAll(false);
    } else {
      setShowSelectAll(true);
    }
  }

  function selectAll() {
    if (showSelectAll) {
      for (let i = 0; i < Object.keys(potentialSections).length; i += 1) {
        setPrevSelectionsTemp((s) => [...s, Object.keys(potentialSections)[i]]);
      }
    } else {
      setPrevSelectionsTemp([]);
    }
    setShowSelectAll((s) => !s);
  }

  async function handleSubmitClose() {
    if (!updateRootSections) {
      return;
    }
    const picked = chosenSections();
    if (picked.length > 0) {
      await updateRootSections(picked);
    } else {
      await updateRootSections(Object.keys(potentialSections));
    }
    closeModal();
  }

  async function handleSubmit() {
    if (!updateRootSections) {
      return;
    }
    setSubmitBusy(true);
    try {
      await updateRootSections(chosenSections());
      setSubmitBusy(false);
      closeModalToNext();
    } catch (error) {
      setIsError(true);
      setSubmitBusy(false);
    }
  }

  return (
    // we should automatically submit upon close, if nothing is chosen, we should selectAll
    <ModalBlank closeDestination={handleSubmitClose}>
      <div className="modal_main_new_acct">
        <div className="modal_main_new_acct-headline_wrap">
          <Label label={`Everything Checks Out, ${userName}`} size="md" />
        </div>
        <ErrorWarn isError={isError} setIsError={setIsError} errorMsg="There was an issue adding your sections" watchArray={[showSelectAll]} />
        <div className="modal_main_new_acct-top_instructions">
          <p>Let&apos;s choose which sections will appear on your page. You can modify this in <span>Settings.</span></p>
        </div>
        <div className="modal_main_new_acct-selections_group">
          <div className="modal_main_new_acct-selections_group-text">
            <TextButtonHTML label={showSelectAll ? "Select All" : "Clear Selections"} link={selectAll} />
          </div>
          <div className="modal_main_new_acct-selections_group-sections">
            <ToggleGroup
              potentialSelections={Object.keys(potentialSections)}
              previousSelections={prevSelectionsTemp}
              autoSaveCallback={getSectionValues}
              ref={sectionRef} />
          </div>
        </div>
        <div className="modal_main_new_acct-submit_button_wrap">
          <MainButtonHTML label="Make it so!" linkCallback={handleSubmit} disabled={showSelectAll} spinner isWorking={submitBusy} />
        </div>
      </div>
    </ModalBlank>
  );
}