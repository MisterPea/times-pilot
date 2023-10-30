import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from "../../db/Auth";
import { useContext } from "react";

interface NavBarProps {
  openLogin: () => void;
  openSettings: () => void;
}
export default function Navbar({ openLogin, openSettings }: NavBarProps) {
  const { uid } = useContext(AuthContext);

  function handleUserButtonClick() {
    if (uid) {
      console.log("UID")
      openSettings();
    } else {
      console.log("NO UID")
      openLogin();
    }
  }

  return (
    <header className="site_header">
      <div className="site_header-banner">
        <div className="site_header-text_wrap">
          <div ><h1 className="-text_white">the<span className="-text_yellow">.times.</span>pilot</h1></div>
          <div><h6>Subscription / Aggregation</h6></div>
        </div>
        <button
          onClick={handleUserButtonClick}
          className="site_header-user_icon">
          <FaUserCircle />
        </button>
      </div>
    </header>
  );
}