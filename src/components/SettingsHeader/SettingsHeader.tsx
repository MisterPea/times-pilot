import { UrlObject } from "url";
import TextButton from "../TextButton/TextButton";

interface SettingsHeaderProps {
  backLink: string | UrlObject;
  headline: string;
}

export default function SettingsHeader({ headline, backLink }:SettingsHeaderProps) {
  return (
    <header className="settings_header">
      <TextButton label="Back" link={backLink} align="left" />
      <h1>{headline}</h1>

    </header>
  );
}