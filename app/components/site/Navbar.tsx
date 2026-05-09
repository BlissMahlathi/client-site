"use client";

import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const links = [
  { href: "#courses", label: "Courses" },
  { href: "#gallery", label: "Gallery" },
  { href: "#blog", label: "Blog" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Book" },
];
const MOBILE_BREAKPOINT = 768;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px)`);
    const onBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    mediaQuery.addEventListener("change", onBreakpointChange);
    return () => mediaQuery.removeEventListener("change", onBreakpointChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", open);
    return () => {
      if (open) document.body.classList.remove("mobile-menu-open");
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "bg-background/80 backdrop-blur-md shadow-soft" : "bg-transparent"}`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-script text-3xl bg-gradient-pink bg-clip-text text-transparent"
        >
          Tasha&apos;s Glamour
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="md:hidden inline-flex items-center gap-2 rounded-full border border-foreground/20 px-3 py-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <FaTimes /> : <FaBars />}
          <span className="text-sm font-medium">Menu</span>
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="md:hidden bg-background/95 backdrop-blur-md border-t">
          <ul className="flex flex-col p-6 gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-foreground/80"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
