import { useRef } from 'react';
import { GrUndo } from 'react-icons/gr';
interface MainButtonHTMLProps {
  label: string;
  linkCallback: () => void;
  outsideClickRef?: React.RefObject<HTMLButtonElement | null>;
  fullWidth?: boolean;
  destructive?: boolean;
  danger?: boolean;
  disabled?: boolean;
  undoIcon?: boolean;
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
}: MainButtonHTMLProps) {

  let buttonRef = useRef<HTMLButtonElement | null>(null);
  if(outsideClickRef){
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

  return (
    <button ref={buttonRef} tabIndex={0} className={classNames()} onClick={handleLinkCallback} >
      <span className='main_button_content'>
        <span className='main_button_content--wrap'>
          {label}
          {undoIcon && <GrUndo />}
        </span>
      </span>
    </button >
  );
}