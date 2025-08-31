"use client"

import React from 'react'
import useSWR from 'swr';
import Loading from '../contact/loading';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/ImageUpload';


type Data = {
  id:string,
  title: string,
  desc?: string,
  img?: string,
  public: boolean,
  content: string,
  createdAt: string;
  user: {
    id: string,
    name: string,
    username: string | null
  }
}

type resData = {
  ok: Boolean,
  posts: Data[];
}


const fetcher = async(url:string)=>{
  const res = await fetch(url,{method:'GET'});
  if(!res.ok){
    throw new Error("Error while Fetching");
  }
  return res.json();
}


const Blog = () => {
  const {data,error,isLoading} = useSWR<resData>(
    "/api/posts",
    fetcher,
    {revalidateOnFocus:true}
  )

  const { isSignedIn } = useUser();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loadingPostId, setLoadingPostId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    desc: '',
    img: '',
    public: false,
    content: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Handle blog post navigation with loading state
  const handlePostClick = (postId: string) => {
    setLoadingPostId(postId);
    router.push(`/blog/${postId}`);
  };

  // Handle image upload
  const handleImageUpload = (url: string) => {
    setForm(prev => ({ ...prev, img: url }));
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const {name, value, type} = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox'
      ? (e.target as HTMLInputElement).checked 
      : value

    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');

    try{
      const res = await fetch("/api/posts",{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form),
      })

      if(!res.ok){
        throw new Error('Failed to add Post');
      }
      setShowForm(false);
      setForm({
        title: '',
        desc: '',
        img: '',
        public: false,
        content: ''
      })

    }catch(error:any){
      setFormError(error.message);
    }finally{
      setSubmitting(false);
    }

  }

  if (submitting || isLoading) return <Loading />;
  if (error) return <div className="text-red-500">Error loading posts: {error.message}</div>;
  // console.log(data);
  if (!data?.ok || !data.posts) {
    return <div className="text-zinc-600 dark:text-zinc-400">No posts available.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Public Posts</h1>
        {isSignedIn && (
        <>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition"
            >
              Add Post
            </button>
            {showForm && (
              <div
                className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
                onClick={() => setShowForm(false)}
              >
                <form
                  onSubmit={handleSubmit}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-lg rounded-lg border border-zinc-200 bg-white p-5 shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <h2 className="text-lg font-semibold mb-4">Add Blog</h2>
                  <div className="space-y-3">
                    <input
                      name="title"
                      placeholder="Title"
                      value={form.title}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                    />
                    <textarea
                      name="desc"
                      placeholder="Description"
                      value={form.desc}
                      onChange={handleChange}
                      className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                    />
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Cover Image
                      </label>
                      <ImageUpload
                        onImageUpload={handleImageUpload}
                        currentImage={form.img}
                      />
                    </div>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        name="public"
                        checked={form.public}
                        onChange={handleChange}
                        className="size-4"
                      />
                      Public
                    </label>
                    <textarea
                      name="content"
                      placeholder="Content"
                      value={form.content}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                    />
                    {formError && (
                      <div className="text-sm text-red-500">{formError}</div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="inline-flex items-center rounded-md border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                    >
                      {submitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.posts?.map((post: Data) => (
          <div key={post.id} className="group cursor-pointer" onClick={() => handlePostClick(post.id)}>
            <article className={`h-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 ${loadingPostId === post.id ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                {loadingPostId === post.id && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  </div>
                )}
                {post.img ? (
                  <Image
                    width={800}
                    height={500}
                    src={post.img}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-900 text-zinc-400">No image</div>
                )}
              </div>
              <div className="p-4">
                <h2 className="line-clamp-2 text-base font-semibold tracking-tight">
                  {post.title}
                </h2>
                <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white text-[10px] grid place-items-center font-semibold">
                      {post.user.name.charAt(0).toUpperCase()}
                    </div>
                    {post.user.username ? `@${post.user.username}` : post.user.name}
                  </span>
                  <span>•</span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                {post.desc && (
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {post.desc}
                  </p>
                )}
                {loadingPostId === post.id && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-indigo-500">
                    <div className="h-3 w-3 animate-spin rounded-full border border-indigo-500 border-t-transparent"></div>
                    Loading...
                  </div>
                )}
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog;