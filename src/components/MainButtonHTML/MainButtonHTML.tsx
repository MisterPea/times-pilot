import { useEffect, useRef } from 'react';
import { GrUndo } from 'react-icons/gr';
import MaterialSpinner, { MaterialSpinnerProps } from '../MaterialSpinner/MaterialSpinner';

interface MainButtonHTMLProps {
  label: string;
  linkCallback: () => void;
  outsideClickRef?: React.RefObject<HTMLButtonElement | null>;
  fullWidth?: boolean;
  destructive?: boolean;
  danger?: boolean;
  disabled?: boolean;
  undoIcon?: boolean;
  isWorking?: boolean;
  spinner?: boolean;
}

export default function MainButtonHTML({
  label,
  linkCallback,
  outsideClickRef,
  fullWidth = false,
  destructive = false,
  danger = false,
  disabled = false,
  undoIcon = false,
  isWorking = true,
  spinner = false,
}: MainButtonHTMLProps) {


  let buttonRef = useRef<HTMLButtonElement | null>(null);
  if (outsideClickRef) {
    buttonRef = outsideClickRef;
  }

  function classNames() {
    const classes = [
      'main_button_base',
      'html_btn',
      fullWidth && 'full_width',
      destructive && 'destructive',
      danger && 'danger',
      disabled && 'disabled'
    ];
    return classes.filter(Boolean).join(' ');
  }

  function handleLinkCallback() {
    if (!disabled) {
      linkCallback();
    }
  }

  const spinnerOption: MaterialSpinnerProps = {
    radius: 9,
    strokeWidth: 3,
    rotationDuration: 800,
    pathAnimationDuration: 3000,
    pathLimits: { min: 0.05, max: 0.99 },
    pathColor: '#ccff00',
    trackColor: '#000',
  };

  return (
    <button ref={buttonRef} tabIndex={0} className={classNames()} onClick={handleLinkCallback} >
      <span className='main_button_content'>
        <span className='main_button_content--wrap'>
          <span className={`main_button-content${isWorking ? ' show_spinner' : ''}`}>{label}</span>
          {undoIcon && <GrUndo />}
          {spinner && <div className={`main_button-spinner${isWorking ? ' show_spinner' : ''}`}><MaterialSpinner {...spinnerOption} /></div>}
        </span>
      </span>
    </button >
  );
}