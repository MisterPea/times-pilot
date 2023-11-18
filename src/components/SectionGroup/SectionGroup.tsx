import { useEffect, useRef, useState } from "react";
import SectionButton from "../SectionButton/SectionButton";
import { useRouter } from "next/router";
import newsSections from "../../helpers/newsSections";

interface SectionGroupProps {
  sections: string[],
  startingSection: string;
}
export default function SectionGroup({ sections, startingSection = 'us' }: SectionGroupProps) {
  const [currentSection, setCurrentSection] = useState<string>(startingSection);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const router = useRouter();

  function selectSection(label: string) {
    console.log(label)
    setCurrentSection(newsSections[label]);
    router.push(newsSections[label]);
  }

  useEffect(() => {
    if (ulRef.current) {
      const activeSection = ulRef.current.querySelector('.selected');
      window.setTimeout(() => {
        activeSection?.scrollIntoView({ behavior: "smooth", inline: "start", block: "end" });
      }, 0);
    }
  }, [currentSection]);

  if (!sections || sections.length === 0) {
    sections = Object.keys(newsSections);
  }

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
              selected={currentSection === section.toLowerCase().replace(' ','')} />
          </li>
        ))}
      </ul>
    </div>
  );
}
