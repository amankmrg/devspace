"use client";
import React,{use} from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Loading from '@/app/contact/loading';

type User = {
  id: string;
  name: string;
  username: string;
};

type Project = {
  id: string;
  title: string;
  detail: string;
  technology?: string;
  img?: string;
  createdAt: string;
  user: User;
};

type ProjectData = {
  ok: boolean;
  project: Project;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (res.status === 404) {
    throw new Error('Project not found');
  }
  if (!res.ok) {
    throw new Error('Failed to fetch project');
  }
  return res.json();
};

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const {id} = use(params);
    const { data, error, isLoading } = useSWR<ProjectData>(
    `/api/projects/${id}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  if (error?.message === 'Project not found') {
    return notFound();
  }

  if (error || !data) {
    return (
      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="grid place-items-center min-h-[50vh]">
            <div className="text-center">
              <h1 className="text-lg font-semibold text-white">Error loading project</h1>
              <p className="mt-2 text-sm text-zinc-400">Please try again later.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { project } = data;

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <nav className="mb-8">
          <Link 
            href="/projects"
            className="text-sm text-indigo-400 hover:text-indigo-300"
          >
            ← Back to projects
          </Link>
        </nav>

        <article className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/50 shadow-sm ring-1 ring-white/5">
          {project.img && (
            <div className="relative aspect-[2/1] w-full overflow-hidden">
              <Image
                src={project.img}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <header className="mb-6">
              <h1 className="text-3xl font-bold text-white">{project.title}</h1>
              <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500">
                <Link
                  href={`/profile/${project.user.username}`}
                  className="flex items-center gap-2 hover:text-zinc-300"
                >
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white text-xs grid place-items-center font-semibold">
                    {project.user.name.charAt(0).toUpperCase()}
                  </div>
                  {project.user.name}
                </Link>
                <span>•</span>
                <time>{new Date(project.createdAt).toLocaleDateString()}</time>
              </div>
            </header>

            {project.technology && (
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-zinc-400">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technology.split(',').map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-zinc-800/80 px-3 py-1 text-sm text-zinc-300 ring-1 ring-white/5"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="prose prose-invert prose-zinc max-w-none">
              <h3 className="text-lg font-medium text-white mb-3">About this project</h3>
              <div className="whitespace-pre-wrap text-zinc-300 leading-relaxed">
                {project.detail}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
