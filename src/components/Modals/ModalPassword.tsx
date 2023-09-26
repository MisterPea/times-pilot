import { useState } from "react";
import Label from "../Label/Label";
import SubmitCancelGroup from "../SubmitCancelGroup/SubmitCancelGroup";
import TextInput from "../TextInput/TextInput";
import ModalBlank from "./ModalBlank";

export default function ModalPassword() {
  const [validEmail, setValidEmail] = useState<boolean>(false);
  return (
    <ModalBlank closeDestination={""}>
      <div className="top_frame">
        <Label label="Can't Recall Your Password?" size="md" />
        <Label label="Enter the email address tied to your account" size="sm" />
      </div>
      <TextInput label="Email" regexTest="email" validInputCallback={setValidEmail}/>
      <div className="bottom_frame">
        <SubmitCancelGroup
          primaryLabel="Submit"
          secondaryLabel="Sign In"
          primaryLink={"#"}
          secondaryLink={"#"}
          fullWidth={false}
          disabled={!validEmail}
        />
        <button className="create_acct_button">
          <p>Don&apos;t have an account? <span>Create an account</span></p>
        </button>
      </div>
    </ModalBlank>
  );
}