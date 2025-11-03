
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#about", label: "About" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [activeLink, setActiveLink] = useState("/#home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => {
        const id = link.href.substring(2);
        return id ? document.getElementById(id) : null;
      });
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveLink(`/#${section.id}`);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = activeLink === href;
    return (
      <Link
        href={href}
        className={cn(
          "relative py-2 text-sm font-medium transition-colors duration-300",
          isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-primary",
          "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary after:transition-transform after:duration-300 after:origin-left",
          isActive ? "after:scale-x-100" : "after:scale-x-0"
        )}
        onClick={() => {
          setIsMenuOpen(false);
          setActiveLink(href);
        }}
      >
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-24 items-center justify-between px-0 sm:px-4">
        <Link href="/#home" onClick={() => setActiveLink('/#home')} className="flex items-baseline gap-3">
            <span className="font-bold sm:inline-block font-headline text-5xl tracking-[0.2em]">
                THE
            </span>
            <span className="hidden md:inline-block text-xs font-body text-muted-foreground tracking-widest uppercase whitespace-nowrap">
                Through Hardik's Eye
            </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
            ))}
        </nav>

        <div className="flex items-center md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-sm">
            <nav className="flex flex-col items-center gap-4 py-6">
                {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
                ))}
            </nav>
        </div>
      )}
    </header>
  );
}
