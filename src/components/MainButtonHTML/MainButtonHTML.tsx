import { GrUndo } from 'react-icons/gr';
interface MainButtonHTMLProps {
  label: string;
  linkCallback: () => void;
  fullWidth?: boolean;
  destructive?: boolean;
  danger?: boolean;
  disabled?: boolean;
  undoIcon?:boolean;
}

export default function MainButtonHTML({
  label,
  linkCallback,
  fullWidth = false,
  destructive = false,
  danger = false,
  disabled = false,
  undoIcon = false,
}: MainButtonHTMLProps) {

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

  return (
    <button role='button' tabIndex={0} className={classNames()} onClick={linkCallback} >
      <span className='main_button_content'>
        <span className='main_button_content--wrap'>
          {label}
          {undoIcon && <GrUndo />}
        </span>
      </span>
    </button >
  );
}