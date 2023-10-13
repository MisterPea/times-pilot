import MainButtonHTML from "../MainButtonHTML/MainButtonHTML";
import TextButtonHTML from "../TextButtonHTML/TextButtonHTML";

interface PrimarySecondaryButtonsProps {
  primaryLabel?: string;
  primaryState?: "destructive" | "danger" | "base";
  primaryLink: () => void;
  primaryOutsideClickRef?: React.RefObject<HTMLButtonElement | null>;
  secondaryLabel?: string;
  secondaryLink: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function PrimarySecondaryButtonsHTML({
  primaryLabel = "Submit",
  primaryLink,
  primaryState,
  secondaryLabel = "Cancel",
  secondaryLink,
  fullWidth,
  primaryOutsideClickRef,
  disabled }: PrimarySecondaryButtonsProps) {
  return (
    <div className={`primary_secondary_group${fullWidth ? " full_width" : ""}`}>
      <div className="primary">
        <MainButtonHTML
          label={primaryLabel}
          linkCallback={primaryLink}
          fullWidth
          danger={primaryState === "danger"}
          destructive={primaryState === "destructive"}
          disabled={disabled}
          outsideClickRef={primaryOutsideClickRef}
        />
      </div>
      <div className="secondary">
        <TextButtonHTML label={secondaryLabel} link={secondaryLink} />
      </div>
    </div>
  );
}
