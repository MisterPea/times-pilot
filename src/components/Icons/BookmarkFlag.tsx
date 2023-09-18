interface BookmarkFlagProps {
  selected: boolean;
}

export default function BookmarkFlag({ selected }: BookmarkFlagProps) {
  return (
      <div className={`bookmark_flag${selected ? " selected" : ""}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="56" viewBox="0 0 41 56" fill="none">
          <g mask="url(#mask0_739_2914)">
            <path d="M16 29.1277L8 37V3.93617C8 1.41702 9.86667 0.262411 11.2 0H28C24.8 0 24 2.62411 24 3.93617V37L16 29.1277Z" fill="url(#paint0_linear_739_2914)" />
          </g>
          <defs>
            <linearGradient id="paint0_linear_739_2914" x1="18" y1="0" x2="18" y2="37" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ED7D7F" />
              <stop offset="0.209642" stopColor="#DC0105" />
            </linearGradient>
          </defs>
        </svg>
      </div>
  );
};
