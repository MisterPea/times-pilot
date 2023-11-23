/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState, useContext, Dispatch } from "react";
import { createPortal } from "react-dom";
import ModalLogin from "../Modals/ModalLogin";
import { AuthContext } from "../../db/Auth";
import { motion, AnimatePresence } from 'framer-motion';
import ModalPassword from "../Modals/ModalPassword";
import ModalNewAcctOne from "../Modals/ModalNewAcct_One";
import ModalNewAcctTwo from "../Modals/ModalNewAcct_Two";
import ModalNewAcct_Last from "../Modals/ModalNewAcct_Last";
import SettingsPanel from "./SettingsPanel";

type AccountType = {
  userName: string,
  email: string,
  password: string,
};

interface SettingsOverlayProps {
  children: any;
  showModal: 'login' | 'settings' | null;
  closeOverlay: any;
  setShowModal: Dispatch<'login' | 'settings' | null>;
}

export default function LoginSettingsOverlay({ children, showModal, setShowModal, closeOverlay }: SettingsOverlayProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const innerDivRef = useRef<HTMLDivElement | null>(null);
  const listenerRef = useRef<EventListener | null>(null);
  const documentRef = useRef<Document | null>(null);
  const tempDivRef = useRef<HTMLDivElement | undefined>(undefined);
  const [deployModal, setDeployModal] = useState<boolean>(false);
  const whichModalRef = useRef<string | null>(null);
  const [currentModal, setCurrentModal] = useState<'login' | 'password' | 'createAccountOne' | 'createAccountTwo' | 'createAccountFinal'>('login');
  const { uid, userName, email, subscriptions, emailActive, toggleEmailActive, getDbContents, credentials } = useContext(AuthContext);
  const acctInfo = { uid, userName, email };
  const username = useRef<string>(''); // to be set by new account one component

  let motionProps = {};
  const createAnimation = (from: string, to: string) => {
    return {
      initial: {
        opacity: 0,
        translateX: from,
      },
      animate: {
        opacity: 1,
        translateX: '0%',
        transition: {
          duration: 0.3,
          ease: [.6, .36, .11, .97],
        }
      },
      exit: {
        opacity: 0,
        translateX: to,
      }
    };
  };

  const settingsVariants = {
    initial: {
      translateX: '-100%',
    },
    animate: {
      opacity: 1,
      translateX: '0%',
      transition: {
        duration: 0.3,
        ease: [.6, .36, .11, .97],
      }
    },
    exit: {
      translateX: '-100%',
    }
  };

  const leftToRight = createAnimation('-2%', '2%');
  const rightToLeft = createAnimation('2%', '-2%');
  const topToBottom = createAnimation('-2%', '2%');

  useEffect(() => {
    documentRef.current = document;
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  useEffect(() => {
    if (whichModalRef.current === null && showModal === 'settings') {
      whichModalRef.current = 'settings';
    }
    if (overlayRef.current && innerDivRef.current && showModal) {
      overlayRef.current.classList.remove('hide');
      innerDivRef.current.classList.remove('hide');
    }
    if (documentRef.current && showModal) {
      const existingOverlay = (documentRef.current.querySelector('.settings_overlay-outer') as HTMLDivElement) || undefined;
      if (existingOverlay) {
        tempDivRef.current = existingOverlay;
      }
      if (!tempDivRef.current) {
        tempDivRef.current = documentRef.current.createElement('div');
        tempDivRef.current.classList.add('settings_overlay-outer');
      }
      const body = documentRef.current.getElementById('__next');
      if (body) {
        body.insertBefore(tempDivRef.current, body.firstChild);
        setDeployModal(true);
      }
    }
  }, [showModal]);

  function handleEscapeKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      if (whichModalRef.current === 'settings') {
        setShowModal(null);
      } else {
        handleCloseModal();
      }
    }
  }

  // This is manually calling an update to keep db and state linked
  function handleUpdateMainState() {
    if (uid && credentials && getDbContents) {
      getDbContents(credentials, uid);
    }
  }

  function handleCloseModal() {
    if (listenerRef.current === null) {
      if (overlayRef.current && innerDivRef.current) {
        overlayRef.current.addEventListener('animationend', () => {
          closeOverlay();
          tempDivRef.current && tempDivRef.current.remove();
          tempDivRef.current = undefined;
          setDeployModal(false);
          setShowModal(null);
          whichModalRef.current = null;
          setCurrentModal('login'); // Reset for stalled sign up
        }, { once: true });
        overlayRef.current.classList.add('hide');
        innerDivRef.current.classList.add('hide');
        handleUpdateMainState();
      }
    }
  }

  function handleDragListen(e: PointerEvent) {
    if (e.pageX < 100) {
      setShowModal(null);
    }
  }

  return (
    <>
      {(deployModal && tempDivRef.current) && createPortal(
        <>
          <div ref={innerDivRef} className="settings_overlay-inner show">
            <AnimatePresence
              mode="wait"
              onExitComplete={() => { whichModalRef?.current === 'settings' && handleCloseModal.call(null); }}
            >
              {(showModal === 'login' && currentModal === 'login') && <motion.div key={'login'} {...leftToRight} style={{ width: '100%' }}>
                <ModalLogin
                  closeModal={handleCloseModal}
                  forgotPasswordCallback={setCurrentModal.bind(null, 'password')}
                  createAccount={setCurrentModal.bind(null, 'createAccountOne')}
                />
              </motion.div>}
              {(showModal === 'login' && currentModal === 'password') && <motion.div key={'password'} {...rightToLeft} style={{ width: '100%' }}>
                <ModalPassword
                  returnToSignIn={setCurrentModal.bind(null, 'login')}
                  createAccount={setCurrentModal.bind(null, 'createAccountOne')}
                />
              </motion.div>}
              {(showModal === 'login' && currentModal === 'createAccountOne') && <motion.div key={'create_account_one'} {...topToBottom} style={{ width: '100%' }}>
                <ModalNewAcctOne
                  closeModalToBrowse={handleCloseModal}
                  returnToSignIn={setCurrentModal.bind(null, 'login')}
                  closeModalToNext={setCurrentModal.bind(null, 'createAccountTwo')}
                  userNameRef={username}
                />
              </motion.div>}
              {(showModal === 'login' && currentModal === 'createAccountTwo') && <motion.div key={'create_account_two'} {...topToBottom} style={{ width: '100%' }}>
                <ModalNewAcctTwo
                  userName={username.current}
                  closeModal={handleCloseModal}
                  closeModalToNext={setCurrentModal.bind(null, 'createAccountFinal')}
                />
              </motion.div>}
              {(showModal === 'login' && currentModal === 'createAccountFinal') && <motion.div key={'create_account_final'} {...topToBottom} style={{ width: '100%' }}>
                <ModalNewAcct_Last
                  userName={username.current}
                  closeModal={handleCloseModal}
                />
              </motion.div>}
              {showModal === 'settings' && (
                <motion.div
                  drag='x'
                  dragConstraints={{ right: 0 }}
                  dragSnapToOrigin
                  dragElastic={0.1}
                  onDrag={handleDragListen}
                  key="settings" {...settingsVariants}
                  className="settings_overlay-panel"
                >
                  <SettingsPanel
                    emailSubscriptions={subscriptions}
                    emailActive={emailActive}
                    accountInfo={acctInfo}
                    closeAction={setShowModal.bind(null, null)}
                    toggleEmailActive={toggleEmailActive}
                  />
                </motion.div>)}
            </AnimatePresence>
          </div>
          <div ref={overlayRef} className="settings_overlay show" />
        </>
        , tempDivRef.current)}
      {children}
    </>
  );
}