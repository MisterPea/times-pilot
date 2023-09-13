import { useEffect, useRef, useState } from "react";
import SectionButton from "../SectionButton/SectionButton";

interface SectionGroupProps {
  sections: string[],
  startingSection: string;
}
export default function SectionGroup({ sections, startingSection='us' }: SectionGroupProps) {
  const [currentSection, setCurrentSection] = useState<string>(startingSection);
  const ulRef = useRef<HTMLUListElement | null>(null);

  function selectSection(label: string) {
    setCurrentSection(label.toLowerCase());
  }

  useEffect(() => {
    if(ulRef.current){
      const activeSection = ulRef.current.querySelector('.selected')
      activeSection!.scrollIntoView({ behavior: "smooth", inline: "nearest" })
    }
  }, [currentSection]);

  return (
    <div className="section_group_base">
      <ul
        ref={ulRef}
        className="section_group_base_ul">
        {sections.map((section) => (
          <li key={section}>
            <SectionButton
              label={section}
              callback={selectSection}
              selected={currentSection === section.toLowerCase()} />
          </li>
        ))}
      </ul>
    </div>
  );
}