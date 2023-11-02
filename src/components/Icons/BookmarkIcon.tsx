/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { LuBookmark } from 'react-icons/lu';

interface BookmarkIconProps {
  selected: boolean;
  callback: () => void;
}

export default function BookmarkIcon({ selected, callback }: BookmarkIconProps) {

  const [isSelected, setIsSelected] = useState<boolean | undefined>(undefined);

  /* In order to do optimistic updates, we need to essentially lag the load
  on load. We also are tieing the side effect to `selected` to run a check on
  the `isSelected` variable to check for alignment. If there was error the side
  will catch it and the local state will be set to align with the db */
  useEffect(() => {
    if (selected !== isSelected) {
      setIsSelected(selected);
    }
  }, [selected]);

  function handleToggle(e: React.MouseEvent<HTMLButtonElement>) {
    setIsSelected((s) => !s);
    e.stopPropagation();
    callback();
  }

  return (
    <button onClick={handleToggle} className='icon_base'>
      <div className={`icon_inner_top${isSelected ? ' selected' : ''}`}>
        <svg stroke="#cd0306" fill="#cd0306" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
        </svg>
      </div>
      <div className='icon_inner_bottom'><LuBookmark /></div>
    </button>
  );
}

