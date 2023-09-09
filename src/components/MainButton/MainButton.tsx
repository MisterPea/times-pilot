import Link from 'next/link';
import { UrlObject } from 'url';

interface MainButtonProps {
  label: string;
  link: string | UrlObject;
  fullWidth?: boolean;
  destructive?: boolean;
  danger?: boolean;
  disabled?: boolean;
}



export default function MainButton({
  label,
  link,
  fullWidth = false,
  destructive = false,
  danger = false,
  disabled = false,
}: MainButtonProps) {

  function classNames() {
    const classes = [
      'main_button_base',
      fullWidth && 'full_width',
      destructive && 'destructive',
      danger && 'danger',
      disabled && 'disabled'
    ];
    return classes.filter(Boolean).join(' ');
  }


  return (
    <Link role='button' tabIndex={0} className={classNames()} href={link} >
      <span className='main_button_content'>{label}</span>
    </Link >
  );
}