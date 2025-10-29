
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState("/#home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.href.substring(2)));
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveLink(`/${'#'}${section.id}`);
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
          "text-sm font-medium transition-colors hover:text-primary relative tracking-widest uppercase",
          isActive ? "text-primary" : "text-muted-foreground",
        )}
        onClick={() => {
          setIsMenuOpen(false);
          setActiveLink(href);
        }}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-24 items-center">
        <Link href="/#home" className="mr-6 flex items-center gap-2" onClick={() => setActiveLink('/#home')}>
          <span className="font-bold sm:inline-block font-headline text-2xl tracking-tighter">
            Through Hardik's Eye
          </span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center gap-8 text-sm">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-sm">
            <nav className="flex flex-col items-center gap-6 py-6">
                {navLinks.map((link) => (
                    <NavLink key={link.href} {...link} />
                ))}
            </nav>
        </div>
      )}
    </header>
  );
}
