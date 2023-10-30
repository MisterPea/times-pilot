import Label from "../Label/Label";
import MainButtonHTML from "../MainButtonHTML/MainButtonHTML";
import ModalBlank from "./ModalBlank";

interface ModalNewAcctLastProps {
  userName: string;
  closeModal: () => void;
}

export default function ModalNewAcct_Last({ userName, closeModal }: ModalNewAcctLastProps) {

  function handleCloseModal() {
    closeModal();
  }

  return (
    <ModalBlank closeDestination={handleCloseModal}>
      <div className="modal_main_new_acct">
        <div className="modal_main_new_acct-final_headline">
          <Label label="You're All Set," size="md" />
          <Label label={userName} size="md" />
        </div>
        <div className="modal_main_new_acct-submit_button_wrap">
          <MainButtonHTML label="Take Me to The News!" linkCallback={handleCloseModal} />
        </div>
      </div>
    </ModalBlank>
  );
}