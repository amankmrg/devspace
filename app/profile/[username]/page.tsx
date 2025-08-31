"use client";
import React from 'react';
import {use} from 'react'
import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Post = {
  id: string;
  title: string;
  desc?: string;
  img?: string;
  createdAt: string;
};

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
  createdAt: string;
};

type ProfileData = {
  ok: boolean;
  user: User;
  posts: Post[];
  projects: Project[];
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (res.status === 404) {
    throw new Error('User not found');
  }
  if (!res.ok) {
    throw new Error('Failed to fetch profile');
  }
  return res.json();
};

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = use(params);
    const { data, error, isLoading } = useSWR<ProfileData>(
    `/api/user/${username}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  if (isLoading) {
    return (
      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid place-items-center min-h-[50vh]">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto rounded-full bg-zinc-800 animate-pulse" />
              <div className="mt-4 h-4 w-32 bg-zinc-800 rounded animate-pulse" />
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
              <h1 className="text-lg font-semibold text-white">Error loading profile</h1>
              <p className="mt-2 text-sm text-zinc-400">Please try again later.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { user, posts, projects } = data;

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl">
        {/* User Header */}
        <header className="mb-12 text-center">
          <div className="mb-4">
            <div className="inline-grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          <p className="text-zinc-400">@{user.username}</p>
          <p className="mt-2 text-xs text-zinc-500">
            Joined {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Recent Posts Section */}
          <section>
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/50 shadow-sm ring-1 ring-white/5">
              <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                <h2 className="text-xl font-semibold text-white">Recent Posts</h2>
                {posts.length > 0 && (
                  <Link
                    href={`/profile/${user.username}/blog`}
                    className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                  >
                    View all
                  </Link>
                )}
              </div>
              {posts.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-zinc-400">
                  No public posts yet.
                </div>
              ) : (
                <ul className="divide-y divide-zinc-800">
                  {posts.map((post) => (
                    <li key={post.id}>
                      <Link
                        href={`/blog/${post.id}`}
                        className="block px-4 py-4 transition hover:bg-zinc-900/40"
                      >
                        <div className="flex gap-4">
                          {post.img && (
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={post.img}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-medium text-white line-clamp-1">{post.title}</h3>
                            {post.desc && (
                              <p className="line-clamp-2 text-sm text-zinc-400">{post.desc}</p>
                            )}
                            <p className="mt-1 text-xs text-zinc-500">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* Recent Projects Section */}
          <section>
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/50 shadow-sm ring-1 ring-white/5">
              <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
                <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
                {projects.length > 0 && (
                  <Link
                    href={`/profile/${user.username}/projects`}
                    className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                  >
                    View all
                  </Link>
                )}
              </div>
              {projects.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-zinc-400">
                  No projects yet.
                </div>
              ) : (
                <ul className="divide-y divide-zinc-800">
                  {projects.map((project) => (
                    <li key={project.id}>
                      <Link
                        href={`/projects/${project.id}`}
                        className="block px-4 py-4 transition hover:bg-zinc-900/40"
                      >
                        <div className="flex gap-4">
                          {project.img && (
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={project.img}
                                alt={project.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-medium text-white line-clamp-1">{project.title}</h3>
                            <p className="line-clamp-2 text-sm text-zinc-400">{project.detail}</p>
                            {project.technology && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {project.technology.split(',').slice(0, 3).map((tech, idx) => (
                                  <span
                                    key={idx}
                                    className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300"
                                  >
                                    {tech.trim()}
                                  </span>
                                ))}
                              </div>
                            )}
                            <p className="mt-1 text-xs text-zinc-500">
                              {new Date(project.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
