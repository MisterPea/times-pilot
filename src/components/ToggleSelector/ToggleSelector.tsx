interface ToggleSelectorProps {
  label: string;
  selected: boolean;
  toggleCallback: (newValue: string) => void;
}

export default function ToggleSelector({ label, selected, toggleCallback }: ToggleSelectorProps) {

  return (
    <div
      className={`toggle_base${selected ? ' selected' : ''}`}
      role="button"
      onClick={toggleCallback.bind(null,label)}
    >
      <p>{label}</p>
    </div>
  );
}