import { LuClipboardEdit } from 'react-icons/lu';

interface EditClipboardIconProps {
  callback: () => void;
}

export default function EditClipboardIcon({ callback }: EditClipboardIconProps) {
  return (
    <button className='icon_base'>
      <div className='icon_inner'><LuClipboardEdit /></div>
    </button>
  );
}