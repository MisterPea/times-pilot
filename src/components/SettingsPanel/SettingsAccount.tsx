
import Label from "../Label/Label";
import { useState, useRef } from "react";
import { AccountInfo } from "./SettingsPanel";

interface SettingsAccountProps {
  name: AccountInfo['userName'];
  email: AccountInfo['email'];
  passwordCallback: () => void;
  usernameCallback: () => void;
  emailCallback: () => void;
}

interface SettingsElementProps {
  label: string;
  content: string;
  onClickAction: () => void;
}

function SettingsElement({ label, content, onClickAction }: SettingsElementProps) {
  return (
    <button onClick={onClickAction} className="settings_block-sections-input_button-element">
      <h4>{label}</h4>
      <div className="settings_block-sections-input_button-mock_input">
        <p className="settings_block-sections-input_button-text">{content}</p>
        <p className="settings_block-sections-input_button-edit">Edit</p>
      </div>
    </button>
  );
}

export default function SettingsAccount({ name, email, passwordCallback, usernameCallback, emailCallback }: SettingsAccountProps) {
  return (
    <div className="settings_block-sections">
      <div className="settings_block-sections-border" />
      <Label label="Account Settings" size="smMd" />
      <div className="settings_block-sections-input_button-wrap">
        <SettingsElement label="Password" content="• • • • • • • • • • • • • • • • • • •" onClickAction={passwordCallback} />
        <SettingsElement label="Username" content={name} onClickAction={usernameCallback} />
        <SettingsElement label="Email" content={email} onClickAction={emailCallback} />
      </div>
    </div>
  );
}