import { MdClose } from 'react-icons/md';

interface ModalBlankProps {
  children: React.ReactNode;
  closeDestination: () => void;
}

export default function ModalBlank({ children, closeDestination }: ModalBlankProps) {
  return (
    <div className="modal_base">
      <div className='modal_middle'>
        <button
          className='close_button'
          onClick={closeDestination}
        >
          <MdClose />
        </button>
        {children}
      </div>
    </div>
  );
}