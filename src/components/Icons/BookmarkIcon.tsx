import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

interface BookmarkIconProps {
  selected: boolean;
  callback: () => void;
}

export default function BookmarkIcon({ selected, callback }: BookmarkIconProps) {
  return (
    <button className='icon_base'>
      <div className={`icon_inner_top${selected ? ' selected' : ''}`}><BsBookmarkFill /></div>
      <div className='icon_inner_bottom'><BsBookmark /></div>
    </button>
  );
}