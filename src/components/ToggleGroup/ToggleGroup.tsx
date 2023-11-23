/* eslint-disable react-hooks/exhaustive-deps */
import { useState, forwardRef, useImperativeHandle, Ref, useEffect, useRef, memo } from "react";
import ToggleSelector from "../ToggleSelector/ToggleSelector";

interface ToggleGroupProps {
  previousSelections: string[];
  potentialSelections: string[];
  autoSaveCallback?: () => void;
  ref?: Ref<{ getValue: () => string[]; }>;
}

/**
 * Component that bundles all toggle buttons together
 * @param {string[]} props.potentialSelections Array of potential choices
 * @param {string[]} props.previousSelections Array of current choices
 * @param {Function} props.autoSaveCallback Callback passed in that is called whenever a change is made.
 * This can be hooked up to a timer that will detect when enough time has elapsed between changes, and commit a save.
 * @param {Object} props.ref Reference to the imperativeHandle handling the date between components.
 * @returns {JsxElement}
 */
const ToggleGroupBase = forwardRef(({ potentialSelections, previousSelections, autoSaveCallback }: ToggleGroupProps, ref) => {
  const [updatedSelections, setUpdatedSelections] = useState([...(previousSelections||[])] );
  const oneClickRef = useRef<boolean>(false);

  // Expose updateSelections
  useImperativeHandle(ref, () => ({
    getValue: () => updatedSelections
  }));

  // We have to listen to changes from outside the component and perform the update inside the component
  useEffect(() => {
    setUpdatedSelections([...(previousSelections || [])]);
  }, [previousSelections]);

  // We have to wait for a state update then we can call the autosaveCallback—else,the callback will fire before the state updates
  useEffect(() => {
    if (oneClickRef.current === true) {
      autoSaveCallback !== undefined && autoSaveCallback();
    }
  }, [updatedSelections]);
  
  /**
   * Function to handle the updating of the local state: updatedSelections
   * @param {string} newLabel String of the toggle being called back
   * @return void
   */
  function handleToggle(newLabel: string) {
    oneClickRef.current = true;
    const index = updatedSelections.indexOf(newLabel);
    if (index > -1) {
      setUpdatedSelections((s) => s.filter((elem) => elem != newLabel));
    } else {
      setUpdatedSelections((s) => [...s, newLabel]);
    }
  }

  return (
    <div className="toggle_group_base">
      {potentialSelections.map((label: string, index: number) => (
        <ToggleSelector
          label={label}
          selected={updatedSelections.includes(label)}
          toggleCallback={handleToggle}
          key={`${index}-${label}`} />
      ))}
    </div>
  );
});

ToggleGroupBase.displayName = 'ToggleGroup';
const ToggleGroup = memo(ToggleGroupBase);
export default ToggleGroup;