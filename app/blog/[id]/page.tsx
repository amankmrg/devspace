import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

type PostData = {
  id: string,
  title: string,
  desc: string | null,
  content: string,
  img: string | null,
  createdAt: Date,
  user: {
    id: string,
    name: string,
    username: string | null
  }
}

const Blog = async({ params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;

    const post = await prisma.posts.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        desc: true,
        content: true,
        img: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      }
    })

    if (!post) {
      notFound();
    }

    return (
      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <nav className="mb-8">
            <Link 
              href="/blog"
              className="text-sm text-indigo-400 hover:text-indigo-300"
            >
              ← Back to blog
            </Link>
          </nav>

          <article className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/50 shadow-sm ring-1 ring-white/5">
            {post.img && (
              <div className="relative aspect-[2/1] w-full overflow-hidden">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="p-8">
              <header className="mb-8">
                <h1 className="text-4xl font-bold text-white leading-tight">
                  {post.title}
                </h1>
                <div className="mt-6 flex items-center gap-4 text-sm text-zinc-500">
                  {post.user.username && (
                    <Link
                      href={`/profile/${post.user.username}`}
                      className="flex items-center gap-2 hover:text-zinc-300"
                    >
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white text-sm grid place-items-center font-semibold">
                        {post.user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium">{post.user.name}</span>
                    </Link>
                  )}
                  {post.user.username && <span>•</span>}
                  <time className="font-medium">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </header>

              {post.desc && (
                <div className="mb-6 text-zinc-400 text-lg">
                  {post.desc}
                </div>
              )}

              <div className="prose prose-lg prose-invert prose-zinc max-w-none">
                <div className="text-zinc-200 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </div>
              </div>
            </div>
          </article>

          <div className="mt-8 flex justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-800/50 px-4 py-2 text-sm font-medium text-zinc-300 ring-1 ring-white/10 hover:bg-zinc-800 hover:text-white"
            >
              ← More posts
            </Link>
            {post.user.username && (
              <Link
                href={`/profile/${post.user.username}`}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600/80 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 hover:bg-indigo-600"
              >
                View author profile →
              </Link>
            )}
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.log(error);
    notFound();
  }
}

export default Blog;