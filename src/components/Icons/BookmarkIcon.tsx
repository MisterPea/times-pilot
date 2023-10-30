import { LuBookmark } from 'react-icons/lu';

interface BookmarkIconProps {
  selected: boolean;
  callback: () => void;
}

export default function BookmarkIcon({ selected, callback }: BookmarkIconProps) {

  function handleToggle(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    callback();
  }

  return (
    <button onClick={handleToggle} className='icon_base'>
      <div className={`icon_inner_top${selected ? ' selected' : ''}`}>
        <svg stroke="#cd0306" fill="#cd0306" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
        </svg>
      </div>
      <div className='icon_inner_bottom'><LuBookmark /></div>
    </button>
  );
}

