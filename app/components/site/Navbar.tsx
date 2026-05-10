"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import gsap from "gsap";

const links = [
  { href: "#courses", label: "Courses" },
  { href: "#gallery", label: "Gallery" },
  { href: "#blog", label: "Blog" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Book" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    gsap.to(menuRef.current, {
      height: open ? "auto" : 0,
      autoAlpha: open ? 1 : 0,
      y: open ? 0 : -8,
      duration: 0.28,
      ease: "power2.out",
      onStart: () => {
        if (open && menuRef.current) {
          menuRef.current.style.pointerEvents = "auto";
        }
      },
      onComplete: () => {
        if (!open && menuRef.current) {
          menuRef.current.style.pointerEvents = "none";
        }
      },
    });
  }, [open]);

  return (
    <header
      data-gsap-text
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/88 backdrop-blur-md shadow-soft" : "bg-transparent"}`}
    >
      <nav className="max-w-7xl mx-auto flex h-16 sm:h-[72px] items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex h-full items-center py-2 shrink-0" aria-label="Tasha's Glamour">
          <Image
            src="/logo.png"
            alt="Tasha's Glamour logo"
            width={176}
            height={72}
            priority
            className="h-full w-auto max-h-11 sm:max-h-12 object-contain"
          />
        </a>
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-background/80 text-foreground transition-all duration-200 active:scale-95"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
      <div
        id="mobile-nav"
        ref={menuRef}
        className="md:hidden h-0 overflow-hidden opacity-0 bg-background/95 backdrop-blur-md border-t border-foreground/10 pointer-events-none"
      >
        <ul className="flex flex-col p-5 gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-foreground/80 hover:bg-accent hover:text-primary transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
