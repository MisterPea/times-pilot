import Label from "../Label/Label";
import MainButtonHTML from "../MainButtonHTML/MainButtonHTML";
import ModalBlank from "./ModalBlank";

interface ModalNewAcctLastProps {
  userName: string;
}

export default function ModalNewAcct_Last({ userName }: ModalNewAcctLastProps) {
  return (
    <ModalBlank closeDestination={() => { }}>
      <div className="modal_main_new_acct">
        <div className="modal_main_new_acct-final_headline">
          <Label label="You're All Set," size="md" />
          <Label label={userName} size="md" />
        </div>
        <div className="modal_main_new_acct-submit_button_wrap">
          <MainButtonHTML label="Take Me to The News!" linkCallback={() => { }} />
        </div>
      </div>
    </ModalBlank>
  );
}