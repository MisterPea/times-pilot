import { useRef } from "react";

interface SectionButtonProps {
  label: string;
  selected: boolean;
  callback: (newValue: string) => void;
}

export default function SectionButton({ label, selected, callback }: SectionButtonProps) {

  return (
    <button
      onClick={callback.bind(null, label)}
      className={`section_button_base${selected ? ' selected' : ''}`}
    >
      <p>{label}</p>
    </button>
  );
}