/* eslint-disable react-hooks/exhaustive-deps */
import { SetStateAction, useEffect, useRef, useState, Dispatch } from "react";
import SectionButton from "../SectionButton/SectionButton";
import { useRouter } from "next/router";
import newsSections from "../../helpers/newsSections";

interface SectionGroupProps {
  sections: string[],
  startingSection: string;
  setIsNav: Dispatch<SetStateAction<boolean>>;
}
export default function SectionGroup({ sections, startingSection = 'us', setIsNav }: SectionGroupProps) {
  const [currentSection, setCurrentSection] = useState<string>(startingSection);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const router = useRouter();

  function selectSection(label: string) {
    setCurrentSection(newsSections[label]);
    router.push(newsSections[label]);
  }

  // We've passed in setIsNav from the parent. So, when we change section (and on initial load) we set
  // the isNavigating to true within the parent

  useEffect(() => {
    setIsNav(true);
    if (ulRef.current) {
      const activeSection = ulRef.current.querySelector('.selected');
      window.setTimeout(() => {
        activeSection?.scrollIntoView({ behavior: "smooth", inline: "start", block: "end" });
      }, 0);
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
              selected={currentSection === section.toLowerCase().replace(' ', '')} />
          </li>
        ))}
      </ul>
    </div>
  );
}
