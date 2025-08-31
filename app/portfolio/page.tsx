import React from "react";
import Link from "next/link";

const Portfolio = () => {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Portfolio</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Selected work and writing.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/blog" className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="font-medium">Blogs</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Read public blogs and contribute yours</p>
          <div className="mt-3 inline-flex items-center text-sm text-indigo-600 group-hover:underline">Explore →</div>
        </Link>

        <Link href="/projects" className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="font-medium">Projects</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Showcase your projects on your profile</p>
          <div className="mt-3 inline-flex items-center text-sm text-indigo-600 group-hover:underline">Explore →</div>
        </Link>
      </div>
    </div>
  );
};

export default Portfolio;