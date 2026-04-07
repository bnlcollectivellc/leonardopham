"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Page = "home" | "content" | "websites" | "apps" | "about";

interface NavigationProps {
  activePage: Page;
  onPageChange: (page: Page) => void;
  onContactClick: () => void;
}

const pages: { key: Page; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "content", label: "Content" },
  { key: "websites", label: "Websites" },
  { key: "apps", label: "Apps" },
  { key: "about", label: "About" },
];

export default function Navigation({
  activePage,
  onPageChange,
  onContactClick,
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Desktop: single row */}
      <div className="hidden md:flex px-4 items-center justify-between h-14 border-b border-border">
        <button
          onClick={() => onPageChange("home")}
          className="text-[14px] font-medium tracking-[0.01em] text-foreground"
        >
          Leonardo Pham
        </button>

        <div className="flex items-center gap-5">
          {pages.map((page, i) => (
            <motion.button
              key={page.key}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              onClick={() => onPageChange(page.key)}
              className={`relative text-[13px] pb-[18px] -mb-[18px] transition-colors duration-200 ${
                activePage === page.key
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {page.label}
              {activePage === page.key && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onContactClick}
            className="text-muted hover:text-foreground transition-colors duration-200"
            aria-label="Email"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
              <rect x="1" y="3" width="14" height="10" rx="1" />
              <path d="M1 3l7 5 7-5" />
            </svg>
          </button>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors duration-200" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
              <rect x="1" y="1" width="14" height="14" rx="4" />
              <circle cx="8" cy="8" r="3.5" />
              <circle cx="12" cy="4" r="0.8" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors duration-200" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2.5 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM1.5 5.5h2v9h-2v-9ZM6 5.5h1.9v1.2h.03c.27-.5 1.05-1.2 2.17-1.2 2.3 0 2.7 1.5 2.7 3.5v4.5h-2V9.5c0-1-.02-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2v5.1H6v-9Z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile: two rows */}
      <div className="md:hidden border-b border-border">
        {/* Row 1: Wordmark left, icons right */}
        <div className="px-4 flex items-center justify-between h-11">
          <button
            onClick={() => onPageChange("home")}
            className="text-[14px] font-medium tracking-[0.01em] text-foreground"
          >
            Leonardo Pham
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={onContactClick}
              className="text-muted hover:text-foreground transition-colors duration-200"
              aria-label="Email"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                <rect x="1" y="3" width="14" height="10" rx="1" />
                <path d="M1 3l7 5 7-5" />
              </svg>
            </button>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors duration-200" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                <rect x="1" y="1" width="14" height="14" rx="4" />
                <circle cx="8" cy="8" r="3.5" />
                <circle cx="12" cy="4" r="0.8" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors duration-200" aria-label="LinkedIn">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2.5 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM1.5 5.5h2v9h-2v-9ZM6 5.5h1.9v1.2h.03c.27-.5 1.05-1.2 2.17-1.2 2.3 0 2.7 1.5 2.7 3.5v4.5h-2V9.5c0-1-.02-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2v5.1H6v-9Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Row 2: Nav buttons */}
        <div className="px-4 flex items-center justify-between h-10">
          {pages.map((page, i) => (
            <motion.button
              key={page.key}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              onClick={() => onPageChange(page.key)}
              className={`relative text-[12px] whitespace-nowrap pb-[10px] -mb-[10px] transition-colors duration-200 ${
                activePage === page.key
                  ? "text-foreground"
                  : "text-muted"
              }`}
            >
              {page.label}
              {activePage === page.key && (
                <motion.div
                  layoutId="navUnderlineMobile"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  );
}
