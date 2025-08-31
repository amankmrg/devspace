"use client";
import React, { useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const navLinks = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Portfolio", url: "/portfolio" },
  { id: 3, title: "Blog", url: "/blog" },
  { id: 4, title: "About", url: "/about" },
  { id: 5, title: "Contact", url: "/contact" },
  { id: 6, title: "Dashboard", url: "/dashboard" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200/20 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30 dark:border-zinc-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white font-semibold shadow-sm">DS</span>
            <span className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">DevSpace</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.id}
                href={l.url}
                className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
              >
                {l.title}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">

            <SignedOut>
              <SignInButton>
                <button className="hidden sm:inline-flex h-9 items-center rounded-md bg-zinc-900 px-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="inline-flex h-9 items-center rounded-md border border-zinc-300 px-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-800 transition">
                  Sign up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton appearance={{ elements: { avatarBox: "h-8 w-8" } }} />
            </SignedIn>

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800"
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle navigation"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-sm">
              {navLinks.map((l) => (
                <Link
                  key={l.id}
                  href={l.url}
                  className="rounded px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  onClick={() => setOpen(false)}
                >
                  {l.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;