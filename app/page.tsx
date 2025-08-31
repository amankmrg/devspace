import Image from "next/image";
import Link from "next/link";
import FeaturedProjects from "@/components/FeaturedProjects";

export default async function Home() {

  return (
    <div className="space-y-16">
      {/* Hero Section */}
<div className="min-h-screen grid gap-12 lg:grid-cols-2 items-center">
  <div className="space-y-6">
    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/40 px-3 py-1 text-xs text-zinc-700 dark:text-zinc-300 shadow-sm">
      <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
      Full Stack Developer
    </span>
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
      Hi, I&apos;m <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Aman Kumar</span>
    </h1>
    <p className="text-zinc-600 dark:text-zinc-400 max-w-prose text-lg">
      Full Stack Developer skilled in React.js, Next.js, Node.js, and modern web technologies. 
      I build scalable applications with clean code and intuitive user experiences.
    </p>
    <p className="text-zinc-500 dark:text-zinc-500 max-w-prose">
      This is my portfolio and blog platform where I share projects and write about development. 
      You can also create your own account to showcase your work and start blogging.
    </p>
    <div className="flex flex-wrap gap-3 pt-2">
      <Link href="/profile/amankmrg/projects" className="inline-flex items-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition">
        View My Projects
      </Link>
      <Link href="/blog" className="inline-flex items-center rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-800 transition">
        Read Public Blogs
      </Link>
      <Link href="/sign-in" className="inline-flex items-center rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-800 transition">
        Join Platform
      </Link>
    </div>
  </div>
  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
    
    <Image
      src="/hero.jpg"
      alt="Developer workspace"
      fill
      className="object-cover"
      sizes="(min-width: 1024px) 50vw, 100vw"
      priority
    />
  </div>
</div>


      {/* Featured Projects Section */}
      <FeaturedProjects />
    </div>
  );
}
