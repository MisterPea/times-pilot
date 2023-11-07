import { useEffect, useRef, useState } from "react";
import SectionButton from "../SectionButton/SectionButton";
import { useRouter } from "next/router";

interface SectionGroupProps {
  sections: string[],
  startingSection: string;
}
export default function SectionGroup({ sections, startingSection = 'us' }: SectionGroupProps) {
  const [currentSection, setCurrentSection] = useState<string>(startingSection);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const router = useRouter();

  function selectSection(label: string) {
    setCurrentSection(label.toLowerCase());
    router.push(label.toLowerCase());
  }

  useEffect(() => {
    if (ulRef.current) {
      // const activeSection = ulRef.current.querySelector('.selected');
      // window.setTimeout(() => {
      //   activeSection!.scrollIntoView({ behavior: "smooth", inline: "start", block: "end" });
      // }, 0);
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
