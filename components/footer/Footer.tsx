import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-zinc-300">
        <div className="flex items-center gap-3">
          <span className="inline-grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white font-semibold">DS</span>
          <p className="text-sm text-zinc-400">
            © {new Date().getFullYear()} DevSpace. All rights reserved.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/about" className="text-zinc-400 hover:text-white">About</Link>
          <Link href="/blog" className="text-zinc-400 hover:text-white">Blog</Link>
          <Link href="/portfolio" className="text-zinc-400 hover:text-white">Portfolio</Link>
          <Link href="/contact" className="text-zinc-400 hover:text-white">Contact</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;