import { MdClose } from 'react-icons/md';
interface ModalBlankProps {
  children: React.ReactNode;
  closeDestination: any;
}
export default function ModalBlank({ children, closeDestination }: ModalBlankProps) {
  return (
    <div className="modal_base">
      <div className='modal_middle'>
        <button className='close_button'><MdClose /></button>
        {children}
      </div>
    </div>
  );
}