import { LuClipboardEdit } from 'react-icons/lu';

interface EditClipboardIconProps {
  callback: () => void;
}

export default function EditClipboardIcon({ callback }: EditClipboardIconProps) {

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    callback();
  }
  
  return (
    <button onClick={handleClick} className='icon_base'>
      <div className='icon_inner'><LuClipboardEdit /></div>
    </button>
  );
}