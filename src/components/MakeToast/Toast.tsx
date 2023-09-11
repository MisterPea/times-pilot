interface ToastProps {
  message: string;
  isError: boolean;
  closeCallback: () => void;
}

export default function Toast({ message, isError, closeCallback }: ToastProps) {
  return (
    <div role='dialog' aria-atomic='true' aria-live='polite' className={`toast_base${isError ? ' error' : ''}`}>
      <p>{message}</p>
      <button tabIndex={0} onClick={closeCallback}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
          <g opacity="0.5">
            <path d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.75 11.25L11.25 18.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.25 11.25L18.75 18.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </button>
    </div>
  );
}