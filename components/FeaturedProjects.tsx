'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  detail: string | null;
  technology: string | null;
  img: string | null;
  createdAt: Date;
}

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects/featured');
        const data = await response.json();
        
        if (data.ok) {
          setProjects(data.projects);
        } else {
          setError('Failed to fetch projects');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Featured Projects
          </h2>
          <p className="mt-2 text-zinc-400">
            A showcase of my recent work and technical expertise
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/60 animate-pulse">
              <div className="aspect-[16/9] bg-zinc-800"></div>
              <div className="p-5 space-y-3">
                <div className="h-6 bg-zinc-800 rounded"></div>
                <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Featured Projects
          </h2>
          <p className="mt-2 text-zinc-400">
            A showcase of my recent work and technical expertise
          </p>
        </div>
        <div className="text-center py-12">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-6 py-12">
            <h3 className="text-lg font-medium text-white mb-2">Error Loading Projects</h3>
            <p className="text-zinc-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
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
  );
}
