"use client"

import React from 'react'
import useSWR from 'swr'
import Loading from '../contact/loading'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react'
import ImageUpload from '@/components/ImageUpload'

type Data = {
    id:string,
    title:string,
    detail:string,
    technology:string,
    img:string,
    createdAt:string
}

type resData = {
    ok:Boolean,
    res:Data[]
}


const fetcher = async(url:string) => {
    const res = await fetch(url,{method:'GET'});
    if(!res.ok){
        throw new Error("Error while fetching Data");
    }
    return res.json();
}

const page = () => {

  const {data,error, isLoading, mutate} = useSWR<resData>(
    "/api/projects",
    fetcher,
    { revalidateOnFocus:true }
  );

    

    const {user,isLoaded} = useUser();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
    title: '',
    detail: '',
    technology: '',
    img: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name, value, type} = e.target;
        setForm(prev => ({
          ...prev,
          [name]: value
        }));
    };

    // Handle image upload
    const handleImageUpload = (url: string) => {
      setForm(prev => ({ ...prev, img: url }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setFormError('');
    
        try{
      const res = await fetch("/api/projects",{
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
            detail: '',
            technology: '',
            img: '',
          })
      // Refresh list
      mutate();
    
        }catch(error:any){
          setFormError(error.message);
        }finally{
          setSubmitting(false);
        }
    
      }


    if(submitting || isLoading||!isLoaded){
        return <Loading/>
    }

    if (error) {
        return <div>Error loading projects: {error.message}</div>;
    }
    // console.log(data);
    


  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <h1 className="text-2xl font-semibold text-white">Projects</h1>
          <p className="mt-2 text-sm text-zinc-400">Your projects will appear here.</p>
          {user && (
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center rounded-md bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Add Project
              </button>
            </div>
          )}
        </header>

        {user && showForm && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowForm(false)}
          >
            <div className="mx-auto grid min-h-dvh place-items-center">
              <form
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-950/90 p-6 shadow-2xl ring-1 ring-white/5"
              >
                <h2 className="mb-4 text-lg font-semibold text-white">Add Project</h2>
                <div className="space-y-3">
                  <input
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <textarea
                    name="detail"
                    placeholder="Detail"
                    value={form.detail}
                    onChange={handleChange}
                    className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    name="technology"
                    placeholder="Technologies Used (comma separated)"
                    value={form.technology}
                    onChange={handleChange}
                    className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Project Image
                    </label>
                    <ImageUpload
                      onImageUpload={handleImageUpload}
                      currentImage={form.img}
                    />
                  </div>
                  {formError && (
                    <div className="text-xs text-red-400" aria-live="polite">{formError}</div>
                  )}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="inline-flex items-center justify-center rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
                  >
                    {submitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {!data?.res?.length && (
          <div className="min-h-[30vh] grid place-items-center">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-6 py-10 text-center shadow-sm">
              <h2 className="text-base font-medium text-white">No projects yet</h2>
              <p className="mt-2 text-sm text-zinc-400">When you add projects, they’ll show up here.</p>
              {user && (
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Add your first project
                </button>
              )}
            </div>
          </div>
        )}

        {data?.res?.length ? (
          <ul className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.res.map((post: Data) => (
              <li key={post.id} className="w-full max-w-sm overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/60 shadow-sm transition hover:shadow-md hover:ring-1 hover:ring-white/10 group">
                <Link href={`/projects/${post.id}`} className="block">
                  {post.img && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        width={800}
                        height={450}
                        src={post.img}
                        alt={post.title || "Project image"}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="mb-1 line-clamp-1 text-base font-semibold text-white group-hover:text-indigo-400 transition">{post.title}</h3>
                    {post.detail && <p className="line-clamp-3 text-sm text-zinc-400">{post.detail}</p>}
                    {post.technology && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.technology.split(',').map((t, idx) => (
                          <span key={`${post.id}-tech-${idx}`} className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-xs text-zinc-300 ring-1 ring-white/5">{t.trim()}</span>
                        ))}
                      </div>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-zinc-500">{new Date(post.createdAt).toLocaleString()}</p>
                      <span className="text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition">
                        View details →
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

export default page