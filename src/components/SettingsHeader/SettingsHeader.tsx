import { UrlObject } from "url";
import TextButton from "../TextButton/TextButton";
import TextButtonHTML from "../TextButtonHTML/TextButtonHTML";

interface SettingsHeaderProps {
  backLink: () => void;
  headline: string;
}

export default function SettingsHeader({ headline, backLink }: SettingsHeaderProps) {

  return (
    <header className="settings_header">
      <TextButtonHTML label="Back" link={backLink} align="left" />
      <h1>{headline}</h1>

    </header>
  );
}