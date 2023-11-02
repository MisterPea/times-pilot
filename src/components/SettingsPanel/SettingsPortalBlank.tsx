import { useEffect, useRef } from 'react';
import SettingsHeader from '../SettingsHeader/SettingsHeader';

interface SettingsPortalBlankProps {
  children: React.ReactNode;
  headline: string;
  backCallback: () => void;
}

export default function SettingsPortalBlank({ headline, children, backCallback }: SettingsPortalBlankProps) {
  const settingsPanelRef = useRef<HTMLDivElement | null>(null);
  const settingsPortalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // We have to see if the settings has scrolled, if it does we offset the settings portal inside of it.
    settingsPanelRef.current = document.querySelector('.settings_overlay-inner');
    if (settingsPortalRef.current && settingsPanelRef.current) {
      settingsPortalRef.current.style.transform = `translateY(${settingsPanelRef.current.scrollTop}px)`;
    }
  }, []);

  return (
    <div ref={settingsPortalRef} className="settings_portal-base">
      <div className='modal_middle'>
        <SettingsHeader headline={headline} backLink={backCallback} />
        {children}
      </div>
    </div>
  );
}
