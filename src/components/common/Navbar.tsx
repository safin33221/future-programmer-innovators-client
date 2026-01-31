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
  defaultDashboardRoute = "/",
}: {
  isAuthenticated: boolean;
  defaultDashboardRoute?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  return (
    <nav className="relative z-50 border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}

          <Logo />


          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className="flex items-center gap-1 text-sm font-medium"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition ${openSubmenu === item.label ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {openSubmenu === item.label && (
                    <div className="absolute left-0 top-full mt-2 w-48 rounded-md border bg-popover shadow-md">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setOpenSubmenu(null)}
                          className="block px-4 py-2 text-sm hover:bg-accent"
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
                  className="text-sm font-medium"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link href={defaultDashboardRoute}>
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <LogoutBtn />
              </>
            ) : (
              <Link href="/login">
                <Button variant="outline">Log in</Button>
              </Link>
            )}

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {
        mobileOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-4 py-4 space-y-2">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="flex w-full items-center justify-between py-2 text-sm font-medium"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition ${openSubmenu === item.label ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {openSubmenu === item.label && (
                      <div className="ml-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => {
                              setMobileOpen(false);
                              setOpenSubmenu(null);
                            }}
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
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )
      }
    </nav >
  );
}
