"use client"

import React, { useEffect } from 'react'
import { useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { useState } from "react"
import Loading from '../contact/loading'

const Username = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [formError, setFormError] = useState(''); // Initialize as empty string
    const [takenUsername, setTakenUsername] = useState(false);
    const [form, setForm] = useState({
        username: ''
    });
    const [redirectOnSuccess, setRedirectOnSuccess] = useState(false);

    useEffect(()=>{
        if(redirectOnSuccess){
            redirect('/dashboard');
        } 
    },[redirectOnSuccess]);

    // console.log(user?.username);
    if (!isLoaded) {
        return <Loading />
    }

    if (isLoaded && !isSignedIn) {
        redirect('/sign-in');
        return null;
    }
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setTakenUsername(false);
        setFormError(''); // Reset previous errors on a new submission

        try {
            const res = await fetch("/api/username", {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(form)
            });

            const response = await res.json();

            // If the server responds with an error status (e.g., 400, 500)
            if (!res.ok) {
                // Use the error message from the API if available, otherwise a default one
                throw new Error(response.message || 'An unexpected error occurred.');
            }

            if (response.taken) {
                setTakenUsername(true);
                setShowForm(true); // Ensure form stays visible
            } else {
                setRedirectOnSuccess(true);
            }

        } catch (error: unknown) {
            // Set the state with the actual error message to display it in the UI
            setFormError(error instanceof Error ? error.message : 'An error occurred');
            setShowForm(true); // Make sure the form is visible to show the error

        } finally {
            setSubmitting(false);
        }
    }

    // You had an error display block, but it would hide the form.
    // It's better to show the error message within the form itself.
    // if (formError) {
    //   return <div>Error adding username: {formError}</div>;
    // }

    return (
        <div>
            {user && showForm && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-4">
                    <div className="mx-auto grid min-h-dvh place-items-center">
                        <form
                            onSubmit={handleSubmit}
                            role="dialog"
                            aria-modal="true"
                            className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-950/90 p-5 shadow-2xl ring-1 ring-white/5"
                        >
                            <h2 className="mb-3 text-lg font-semibold text-white">Choose a username</h2>
                            <div className="space-y-2">
                                <input
                                    name="username"
                                    placeholder="Username must be unique"
                                    value={form.username}
                                    onChange={handleChange}
                                    required
                                    className={`w-full rounded-md border bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${takenUsername ? 'border-red-500' : 'border-zinc-700'}`}
                                />
                                {takenUsername && (
                                    <p className="-mt-1 text-xs text-red-400">Username is already taken.</p>
                                )}
                                {formError && (
                                    <div className="text-xs text-red-400" aria-live="polite">{formError}</div>
                                )}
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="inline-flex items-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
                                >
                                    {submitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Username