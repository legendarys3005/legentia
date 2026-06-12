"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Appbar.module.css";

interface Language {
  code: string;
  name: string;
}

export default function Appbar() {
  const pathname = usePathname();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<string>("JS");

  const getPageTitle = (path: string): string => {
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 0) return "Courses";

    const firstSegment = segments[0].toLowerCase();
    switch (firstSegment) {
      case "courses":
        return "Courses";
      case "explore":
        return "Explore Platform";
      case "roadmaps":
        return "Learning Roadmaps";
      case "challenges":
        return "Daily Challenges";
      case "projects":
        return "Real-world Projects";
      case "labs":
        return "Interactive Labs";
      case "profile":
        return "Developer Profile";
      case "subscriptions":
        return "Subscriptions";
      default:
        return firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);
    }
  };

  const pageTitle = getPageTitle(pathname);

  const languages: Language[] = [
    { code: "JS", name: "JavaScript" },
    { code: "Py", name: "Python" },
    { code: "TS", name: "TypeScript" },
    { code: "SQL", name: "SQL Database" },
    { code: "Go", name: "Go Language" },
  ];

  return (
    <header className={styles.appbar} id="main-appbar">
      <div className={styles.leftSection}>
        {/* <h2 className={styles.pageTitle}>{pageTitle}</h2> */}
      </div>

      <div className={styles.rightSection}>
        {/* Simplified Energy Indicator */}
        <div className={styles.energyContainer} title="5 Energy Points">
          <svg
            className={styles.energyIcon}
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span className={styles.energyValue}>5</span>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Programming Language Selector */}
        <div className={styles.langSelectorContainer}>
          <button
            className={`${styles.langBtn} ${langDropdownOpen ? styles.langBtnActive : ""}`}
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            aria-expanded={langDropdownOpen}
            aria-haspopup="listbox"
            aria-label="Select coding language"
          >
            <svg
              className={styles.codeIcon}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span className={styles.langCode}>{currentLang}</span>
            <svg
              className={`${styles.chevron} ${langDropdownOpen ? styles.chevronOpen : ""}`}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {langDropdownOpen && (
            <>
              <div className={styles.dropdownOverlay} onClick={() => setLangDropdownOpen(false)} />
              <ul className={styles.dropdownMenu} role="listbox">
                {languages.map((lang) => (
                  <li key={lang.code} role="option" aria-selected={currentLang === lang.code}>
                    <button
                      className={`${styles.dropdownItem} ${currentLang === lang.code ? styles.dropdownItemActive : ""}`}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setLangDropdownOpen(false);
                      }}
                    >
                      <span className={styles.dropdownItemName}>{lang.name}</span>
                      {currentLang === lang.code && (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={styles.checkIcon}
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
