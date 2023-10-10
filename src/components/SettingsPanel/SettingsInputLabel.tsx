interface TextInputStaticMockProps {
  label: string;
  content: string;
}
export default function TextInputStaticMock({ label, content }: TextInputStaticMockProps) {

  return (
    <div className="settings_block-sections-input_button-element minimal">
      <h4>{label}</h4>
      <div className="settings_block-sections-input_button-mock_input minimal">
        <p className="settings_block-sections-input_button-text--lighter">{content}</p>
      </div>
    </div>
  );
}
