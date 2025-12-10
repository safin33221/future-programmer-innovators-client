"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    children: [
      { label: "About Club", href: "/about" },
      { label: "Vision & Mission", href: "/vision-mission" },
      { label: "Why Join?", href: "/why-join" },
    ],
  },
  {
    label: "Activities",
    href: "/activities",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(
    null
  );

  function toggleMobileSubmenu(label: string) {
    setMobileSubmenuOpen((prev) => (prev === label ? null : label));
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-6">
                {NAV_ITEMS.map((item) =>
                  item.children ? (
                    <div key={item.label} className="relative group">
                      <button className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 flex items-center">
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>

                      {/* Dropdown */}
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-popover ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="py-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href!}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2"
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/apply">
                <Button>Join Now</Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute bg-background  w-full">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    className="flex w-full justify-between items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => {
                      toggleMobileSubmenu(item.label)

                    }
                    }
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${mobileSubmenuOpen === item.label ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* Collapsible submenu */}
                  {mobileSubmenuOpen === item.label && (
                    <div className="ml-4 space-y-1 mt-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block rounded-md px-3 py-2 text-base text-foreground hover:bg-accent"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          <div className="border-t border-border pb-3 pt-4">
            <div className="flex items-center px-5 space-x-4">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link href="/apply" className="w-full">
                <Button className="w-full">Join Now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
