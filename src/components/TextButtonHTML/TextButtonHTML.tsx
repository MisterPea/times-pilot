import Link from 'next/link';
import { UrlObject } from 'url';

interface TextButtonProps {
  label: string;
  link: () => void;
  /* Align left will also remove top/bottom margins */
  align?: "left";
}

export default function TextButtonHTML({ label, link, align }: TextButtonProps) {
  return (
    <button className='text_button_base' tabIndex={0} onClick={link}>
      <span className={`text_button_content${align === "left" ? " left" : ""}`}>{label}</span>
    </button>
  );
}