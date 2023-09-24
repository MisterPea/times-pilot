import Link from 'next/link';
import { UrlObject } from 'url';

interface TextButtonProps {
  label: string;
  link: string | UrlObject;
  /* Align left will also remove top/bottom margins */
  align?: "left";
}

export default function TextButton({ label, link, align }: TextButtonProps) {
  return (
    <Link className='text_button_base' href={link}>
      <span className={`text_button_content${align === "left" ? " left" : ""}`}>{label}</span>
    </Link>
  );
}