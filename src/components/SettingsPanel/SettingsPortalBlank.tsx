import SettingsHeader from '../SettingsHeader/SettingsHeader';

interface SettingsPortalBlankProps {
  children: React.ReactNode;
  headline: string;
  backCallback: () => void;
}

export default function SettingsPortalBlank({ headline, children, backCallback }:SettingsPortalBlankProps) {
  return (
    <div className="modal_base">
      <div className='modal_middle'>
        <SettingsHeader headline={headline} backLink={backCallback}/>
        {children}
      </div>
    </div>
  );
}
