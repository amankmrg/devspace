import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getMyProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        user: {
          username: "amankmrg"
        }
      },
      select: {
        id: true,
        title: true,
        detail: true,
        technology: true,
        img: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 6 // Show latest 6 projects
    });
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function Home() {
  const projects = await getMyProjects();

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
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Featured Projects
          </h2>
          <p className="mt-2 text-zinc-400">
            A showcase of my recent work and technical expertise
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`projects/${project.id}`}
                className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/60 shadow-sm transition hover:shadow-md hover:ring-1 hover:ring-white/10"
              >
                {project.img && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-white group-hover:text-indigo-400 transition">
                    {project.title}
                  </h3>
                  {project.detail && (
                    <p className="line-clamp-3 text-sm text-zinc-400 mb-3">
                      {project.detail}
                    </p>
                  )}
                  {project.technology && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technology.split(',').slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-zinc-800/80 px-2 py-1 text-xs text-zinc-300 ring-1 ring-white/5"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                      {project.technology.split(',').length > 3 && (
                        <span className="text-xs text-zinc-500">
                          +{project.technology.split(',').length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                    <span className="text-indigo-400 opacity-0 group-hover:opacity-100 transition">
                      View details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-6 py-12">
              <h3 className="text-lg font-medium text-white mb-2">No Projects Yet</h3>
              <p className="text-zinc-400 mb-4">Start building and showcase your work!</p>
              <Link
                href="/projects"
                className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
              >
                Add Your First Project
              </Link>
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div className="text-center">
            <Link
              href="/profile/amankmrg/projects"
              className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
            >
              View All Projects
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
