import { MdClose } from 'react-icons/md';

interface ModalBlankHeadlineProps {
  children: React.ReactNode;
  closeDestination: () => void;
}

export default function ModalBlankHeadline({ children, closeDestination }: ModalBlankHeadlineProps) {
  return (
    <div className="modal_base">
      <div className='modal_middle headline'>
        <button
          className='close_button'
          onClick={closeDestination}
        >
          <MdClose />
        </button>
        <header className='modal_headline'>
          <h1 className="modal_headline-text_white">
            the<span className='modal_headline-text_yellow'>.times.</span>pilot
          </h1>
          <h6>Subscription / Aggregation</h6>
        </header>
        {children}
      </div>
    </div>
  );
}