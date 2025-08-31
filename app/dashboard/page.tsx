"use client";
import React, { useMemo, useState } from 'react';
import useSWR from 'swr';
import { useUser } from '@clerk/nextjs';
import Loading from './loading';
import ImageUpload from '@/components/ImageUpload';

type Post = {
  id: string;
  title: string;
  desc?: string;
  img?: string;
  public: boolean;
  content: string;
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

type PostsResponse = { ok: boolean; posts: Post[] };
type ProjectsResponse = { ok: boolean; res: Project[] };

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

export default function Dashboard() {
  const { isLoaded, isSignedIn } = useUser();

  const { data: postsData, error: postsError, isLoading: postsLoading, mutate: mutatePosts } = useSWR<PostsResponse>(
    '/api/posts?mine=1',
    fetcher,
    { revalidateOnFocus: true }
  );

  const { data: projectsData, error: projectsError, isLoading: projectsLoading, mutate: mutateProjects } = useSWR<ProjectsResponse>(
    '/api/projects',
    fetcher,
    { revalidateOnFocus: true }
  );

  const [editing, setEditing] = useState<{ type: 'post' | 'project'; id: string } | null>(null);
  const [form, setForm] = useState<any>({});
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const startEdit = (type: 'post' | 'project', item: any) => {
    setEditing({ type, id: item.id });
    setForm(type === 'post'
      ? { title: item.title, desc: item.desc || '', img: item.img || '', public: item.public, content: item.content }
      : { title: item.title, detail: item.detail, technology: item.technology || '', img: item.img || '' }
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((s: any) => ({
      ...s,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Handle image upload for editing
  const handleImageUpload = (url: string) => {
    setForm((prev: any) => ({ ...prev, img: url }));
  };

  const saveEdit = async () => {
    if (!editing) return;
    try {
      setBusy(true);
      setErr(null);
      const url = editing.type === 'post' ? `/api/posts/${editing.id}` : `/api/projects/${editing.id}`;
      const res = await fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error('Update failed');
      setEditing(null);
      if (editing.type === 'post') mutatePosts(); else mutateProjects();
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  const delItem = async (type: 'post' | 'project', id: string) => {
    if (!confirm('Delete this item?')) return;
    try {
      setBusy(true);
      const url = type === 'post' ? `/api/posts/${id}` : `/api/projects/${id}`;
      const res = await fetch(url, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      if (type === 'post') mutatePosts(); else mutateProjects();
    } catch (e) {
      // swallow
    } finally {
      setBusy(false);
    }
  };

  if (!isLoaded || postsLoading || projectsLoading) return <Loading />;
  if (!isSignedIn) return <div className="text-sm text-zinc-600 dark:text-zinc-400">Please sign in to view your dashboard.</div>;
  if (postsError || projectsError) return <div className="text-red-500">Failed to load dashboard.</div>;

  const posts = postsData?.posts || [];
  const projects = projectsData?.res || [];

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section>
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/50 shadow-sm ring-1 ring-white/5">
            <div className="flex w-full items-center justify-between gap-4 border-b border-zinc-800 px-4 py-3">
              <h2 className="truncate text-xl font-semibold tracking-tight text-white">Your Posts</h2>
              <a href="/blog" className="shrink-0 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300">Create new</a>
            </div>
            {posts.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-zinc-400">No posts yet.</div>
            ) : (
              <ul className="divide-y divide-zinc-800">
                {posts.map((p) => (
                  <li key={p.id} className="flex items-start gap-4 px-4 py-4 transition hover:bg-zinc-900/40">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">{p.title}</h3>
                        <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1 ${p.public ? 'bg-emerald-900/20 text-emerald-300 ring-emerald-600/40' : 'bg-zinc-800 text-zinc-300 ring-white/10'}`}>{p.public ? 'Public' : 'Private'}</span>
                      </div>
                      {p.desc && <p className="line-clamp-2 text-sm text-zinc-400">{p.desc}</p>}
                      <p className="mt-1 text-xs text-zinc-500">{new Date(p.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit('post', p)} className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800">Edit</button>
                      <button onClick={() => delItem('post', p.id)} className="rounded-md border border-red-600/50 px-3 py-1.5 text-sm text-red-400 hover:bg-red-900/30">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section>
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/50 shadow-sm ring-1 ring-white/5">
            <div className="flex w-full items-center justify-between gap-4 border-b border-zinc-800 px-4 py-3">
              <h2 className="truncate text-xl font-semibold tracking-tight text-white">Your Projects</h2>
              <a href="/projects" className="shrink-0 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300">Create new</a>
            </div>
            {projects.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-zinc-400">No projects yet.</div>
            ) : (
              <ul className="divide-y divide-zinc-800">
                {projects.map((p) => (
                  <li key={p.id} className="flex items-start gap-4 px-4 py-4 transition hover:bg-zinc-900/40">
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{p.title}</h3>
                      {p.detail && <p className="line-clamp-2 text-sm text-zinc-400">{p.detail}</p>}
                      <p className="mt-1 text-xs text-zinc-500">{new Date(p.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit('project', p)} className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800">Edit</button>
                      <button onClick={() => delItem('project', p.id)} className="rounded-md border border-red-600/50 px-3 py-1.5 text-sm text-red-400 hover:bg-red-900/30">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
        </div>

        {editing && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={() => setEditing(null)}>
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl ring-1 ring-white/5">
              <h3 className="mb-4 text-lg font-semibold text-white">Edit {editing.type === 'post' ? 'Post' : 'Project'}</h3>
              {err && <div className="mb-2 text-sm text-red-400">{err}</div>}
              <div className="space-y-3">
                <input name="title" value={form.title || ''} onChange={onChange} placeholder="Title" className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                {editing.type === 'post' ? (
                  <>
                    <textarea name="desc" value={form.desc || ''} onChange={onChange} placeholder="Description" className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Cover Image
                      </label>
                      <ImageUpload
                        onImageUpload={handleImageUpload}
                        currentImage={form.img}
                      />
                    </div>
                    <label className="flex items-center gap-2 text-sm text-zinc-200">
                      <input type="checkbox" name="public" checked={!!form.public} onChange={onChange} className="size-4 rounded border-zinc-700 bg-zinc-900" />
                      Public
                    </label>
                    <textarea name="content" value={form.content || ''} onChange={onChange} placeholder="Content" className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </>
                ) : (
                  <>
                    <textarea name="detail" value={form.detail || ''} onChange={onChange} placeholder="Detail" className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input name="technology" value={form.technology || ''} onChange={onChange} placeholder="Technology" className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Project Image
                      </label>
                      <ImageUpload
                        onImageUpload={handleImageUpload}
                        currentImage={form.img}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setEditing(null)} className="inline-flex items-center rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800">Cancel</button>
                <button onClick={saveEdit} disabled={busy} className="inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-400 disabled:opacity-50">{busy ? 'Saving...' : 'Save'}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}