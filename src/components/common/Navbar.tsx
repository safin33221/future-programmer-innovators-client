"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">

              <Logo />

            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2"
                >
                  Home
                </Link>

                {/* Dropdown */}
                <div className="relative group">
                  <button className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 flex items-center">
                    About
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-popover ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link
                        href="/about"
                        className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        About Club
                      </Link>
                      <Link
                        href="/vision-mission"
                        className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        Vision & Mission
                      </Link>
                      <Link
                        href="/why-join"
                        className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        Why Join?
                      </Link>
                    </div>
                  </div>
                </div>

                <Link
                  href="/activities"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2"
                >
                  Activities
                </Link>

                <Link
                  href="/events"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2"
                >
                  Events
                </Link>

                <Link
                  href="/contact"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2"
                >
                  Contact
                </Link>
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
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              About
            </Link>
            <Link
              href="/activities"
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Activities
            </Link>
            <Link
              href="/events"
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Events
            </Link>
            <Link
              href="/contact"
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Contact
            </Link>
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
