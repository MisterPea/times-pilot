import Link from 'next/link';
import { UrlObject } from 'url';

interface TextButtonProps {
  label: string;
  link: string | UrlObject;
}

export default function TextButton({ label, link }: TextButtonProps) {
  return (
    <Link className='text_button_base' href={link}>
      <span className='text_button_content'>{label}</span>
    </Link>
  );
}