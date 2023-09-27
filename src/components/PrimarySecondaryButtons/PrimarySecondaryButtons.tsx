import { UrlObject } from "url";
import MainButton from "../MainButton/MainButton";
import TextButton from "../TextButton/TextButton";

interface PrimarySecondaryButtonsProps {
  primaryLabel?: string;
  primaryState?: "destructive" | "danger" | "base";
  primaryLink: string | UrlObject;
  secondaryLabel?: string;
  secondaryLink: string | UrlObject;
  fullWidth?: boolean;
  disabled?: boolean;
}
export default function PrimarySecondaryButtons({
  primaryLabel = "Submit",
  primaryLink,
  primaryState,
  secondaryLabel = "Cancel",
  secondaryLink,
  fullWidth,
  disabled }: PrimarySecondaryButtonsProps) {
  return (
    <div className={`primary_secondary_group${fullWidth ? " full_width" : ""}`}>
      <div className="primary">
        <MainButton
          label={primaryLabel}
          link={primaryLink}
          fullWidth
          danger={primaryState === "danger"}
          destructive={primaryState === "destructive"}
          disabled={disabled}
        />
      </div>
      <div className="secondary">
        <TextButton label={secondaryLabel} link={secondaryLink} />
      </div>
    </div>
  );
}