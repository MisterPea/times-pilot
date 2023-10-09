import { useState } from "react";

interface PauseEmailButtonProps {
  isActive: boolean;
  toggleState?: () => void;
}

interface ToggleProps {
  isActive: boolean;
}

function ToggleSwitch({ isActive }: ToggleProps) {
  return (
    <div className={`toggle_switch-base ${isActive ? "--active" : "--paused"}`}>
      <div className={`toggle_switch-button ${isActive ? "--active" : "--paused"}`} />
    </div>
  );
}

export default function PauseEmailButton({ isActive, toggleState }: PauseEmailButtonProps) {

  function handleToggle() {
    if (toggleState) {
      toggleState();
    }
  }

  return (
    <div
      onClick={handleToggle}
      className="pause_email_button">
      <ToggleSwitch isActive={isActive} />
      <div className="pause_email_button-text_wrap">
        <p className={`pause_email_button-text--active${isActive ? " active" : ""}`}>Daily emails are active.</p>
        <p className={`pause_email_button-text--paused${isActive ? "" : " active"}`}>Daily emails are paused.</p>
      </div>
    </div>
  );
}