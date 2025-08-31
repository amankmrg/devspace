"use client";
import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { use } from 'react';

type Project = {
  id: string;
  title: string;
  detail: string;
  technology?: string;
  img?: string;
  createdAt: string;
};

type User = {
  id: string;
  name: string;
  username: string;
};

type ProjectData = {
  ok: boolean;
  user: User;
  projects: Project[];
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (res.status === 404) {
    throw new Error('User not found');
  }
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  return res.json();
};

export default function UserProjectsPage({ params }: { params: Promise<{ username: string }> }) {
    const {username} = use(params);
    const { data, error, isLoading } = useSWR<ProjectData>(
    `/api/user/${username}/projects`,
    fetcher,
    { revalidateOnFocus: false }
  );

  if (isLoading) {
    return (
      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid place-items-center min-h-[50vh]">
            <div className="text-center">
              <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error?.message === 'User not found') {
    return notFound();
  }

  if (error || !data) {
    return (
      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid place-items-center min-h-[50vh]">
            <div className="text-center">
              <h1 className="text-lg font-semibold text-white">Error loading projects</h1>
              <p className="mt-2 text-sm text-zinc-400">Please try again later.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { user, projects } = data;

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <nav className="mb-4">
            <Link 
              href={`/profile/${user.username}`}
              className="text-sm text-indigo-400 hover:text-indigo-300"
            >
              ← Back to {user.name}'s profile
            </Link>
          </nav>
          <h1 className="text-2xl font-semibold text-white">All Projects by {user.name}</h1>
          <p className="mt-2 text-sm text-zinc-400">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </p>
        </header>

        {projects.length === 0 ? (
          <div className="grid place-items-center min-h-[30vh]">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-6 py-10 text-center">
              <h2 className="text-base font-medium text-white">No projects</h2>
              <p className="mt-2 text-sm text-zinc-400">{user.name} hasn't created any projects yet.</p>
            </div>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/projects/${project.id}`}
                  className="block overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/50 shadow-sm transition hover:shadow-md hover:ring-1 hover:ring-white/10"
                >
                  {project.img && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={project.img}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-medium text-white line-clamp-2">{project.title}</h3>
                    <p className="mt-1 line-clamp-3 text-sm text-zinc-400">{project.detail}</p>
                    {project.technology && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.technology.split(',').map((tech, idx) => (
                          <span
                            key={idx}
                            className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-xs text-zinc-300 ring-1 ring-white/5"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="mt-3 text-xs text-zinc-500">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
