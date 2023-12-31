interface AutoSaveProps {
  saving: boolean;
  error: boolean;
}

export default function AutoSave({ saving, error }: AutoSaveProps) {

  // Convenience function to render classNames
  function combineClass() {
    const baseClass = ['auto_save_inner_wrapper'];
    if (saving && !error) {
      baseClass.push('is_saving');
    }
    else if (error) {
      baseClass.push('error');
    }
    else {
      baseClass.push('saved');
    }
    return baseClass.join(' ');
  }

  return (
    <div className="auto_save_base">
      <div className="auto_save_inner" aria-live="polite">
        <ul
          className={combineClass()}>
          <li className={`condition saved ${!saving && !error ? "active" : ""}`}>• All Changes Saved</li>
          <li className={`condition is_saving ${saving && !error ? "active" : ""}`}>• Saving...</li>
          <li className={`condition error ${error ? "active" : ""}`}>• Changes Not Saved!</li>
        </ul>
      </div>
    </div>
  );
}