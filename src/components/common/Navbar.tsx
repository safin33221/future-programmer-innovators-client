"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import LogoutBtn from "../shared/LogoutBtn";


interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    children: [
      { label: "About Club", href: "/about" },
      { label: "Vision & Mission", href: "/vision-mission" },
      { label: "Why Join?", href: "/why-join" },
      { label: "Our Team", href: "/team" },
    ],
  },
  { label: "Activities", href: "/activities" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({
  isAuthenticated,
  defaultDashboardRoute = '/',
}: {
  isAuthenticated: boolean;
  defaultDashboardRoute?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] =
    useState<string | null>(null);

  const toggleMobileSubmenu = (label: string) => {
    setMobileSubmenuOpen((prev) => (prev === label ? null : label));
  };

  return (
    <nav className="relative top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <button className="flex items-center gap-1 text-sm font-medium">
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  <div className="absolute left-0 mt-2 w-48 rounded-md bg-popover shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-sm hover:bg-accent"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="text-sm font-medium"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Right side (Dashboard always visible) */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link href={defaultDashboardRoute && defaultDashboardRoute}>
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <LogoutBtn />
              </>
            ) : (
              <Link href="/login">
                <Button variant="outline">Log in</Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (only nav items) */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-t z-40">
          <div className="px-4 py-4 space-y-3">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => toggleMobileSubmenu(item.label)}
                    className="flex w-full items-center justify-between py-2 text-sm font-medium"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition ${mobileSubmenuOpen === item.label ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {mobileSubmenuOpen === item.label && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-1 text-sm text-muted-foreground"
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
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-sm font-medium"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
