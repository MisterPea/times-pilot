import { UrlObject } from "url";
import MainButton from "../MainButton/MainButton";
import TextButton from "../TextButton/TextButton";

interface SubmitCancelGroupProps {
  submitLabel?: string;
  submitState?: "destructive" | "danger" | "base";
  submitLink: string | UrlObject;
  cancelLink: string | UrlObject;
  fullWidth: boolean;
  disabled: boolean;
}
export default function SubmitCancelGroup({ submitLabel = "Submit", submitLink, cancelLink, submitState, fullWidth, disabled }: SubmitCancelGroupProps) {
  return (
    <div className={`submit_cancel_group${fullWidth ? " full_width" : ""}`}>
      <div className="submit">
        <MainButton
          label={submitLabel}
          link={submitLink}
          fullWidth
          danger={submitState === "danger"}
          destructive={submitState === "destructive"}
          disabled={disabled}
        />
      </div>
      <div className="cancel">
        <TextButton label="Cancel" link={cancelLink} />
      </div>
    </div>
  );
}