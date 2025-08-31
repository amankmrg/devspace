import React from "react";
import Link from "next/link";
import Image from "next/image";

const Contact = () => {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">Get In Touch</h1>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                    Have a project in mind or want to collaborate? I'd love to hear from you. 
                    Let's build something amazing together!
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <div className="bg-zinc-950/50 rounded-xl border border-zinc-800 p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">Send Me a Message</h2>
                        
                        <form className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                        placeholder="Your full name"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-zinc-300 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="What's this about?"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                                    placeholder="Tell me about your project or ideas..."
                                    required
                                ></textarea>
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                    {/* Direct Contact */}
                    <div className="bg-zinc-950/50 rounded-xl border border-zinc-800 p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-full bg-indigo-600/20 text-indigo-300 grid place-items-center text-lg flex-shrink-0">
                                    <Image
                                        src="/email.svg"
                                        alt="Email"
                                        width={20}
                                        height={20}
                                        className="filter brightness-0 invert opacity-70"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-white">Email</p>
                                    <a 
                                        href="mailto:amankmrg@gmail.com" 
                                        className="text-zinc-400 hover:text-indigo-400 transition break-all"
                                    >
                                        amankmrg@gmail.com
                                    </a>
                                </div>
                            </div>
                            
                            
                            
                            <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-full bg-fuchsia-600/20 text-fuchsia-300 grid place-items-center text-lg flex-shrink-0">
                                    <Image
                                        src="/location.svg"
                                        alt="Location"
                                        width={20}
                                        height={20}
                                        className="filter brightness-0 invert opacity-70"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-white">Location</p>
                                    <p className="text-zinc-400">Chennai, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-zinc-950/50 rounded-xl border border-zinc-800 p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Connect With Me</h3>
                        <div className="space-y-3">
                            <a 
                                href="https://github.com/amankmrg" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-zinc-400 hover:text-white transition group"
                            >
                                <div className="h-8 w-8 rounded-full bg-zinc-800 grid place-items-center text-sm group-hover:bg-zinc-700 transition">
                                    <Image
                                        src="/github-logo.svg"
                                        alt="GitHub"
                                        width={16}
                                        height={16}
                                        className="filter brightness-0 invert opacity-70 group-hover:opacity-100 transition"
                                    />
                                </div>
                                <span>GitHub</span>
                            </a>
                            
                            <a 
                                href="https://linkedin.com/in/amankmrg" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-zinc-400 hover:text-white transition group"
                            >
                                <div className="h-8 w-8 rounded-full bg-blue-600/20 text-blue-300 grid place-items-center text-sm group-hover:bg-blue-600/30 transition">
                                    <Image
                                        src="/linkedin-logo.svg"
                                        alt="LinkedIn"
                                        width={16}
                                        height={16}
                                        className="filter brightness-0 invert opacity-70 group-hover:opacity-100 transition"
                                    />
                                </div>
                                <span>LinkedIn</span>
                            </a>
                            
                        
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="bg-zinc-950/50 rounded-xl border border-zinc-800 p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Availability</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="text-zinc-300 text-sm">Available for freelance projects</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="text-zinc-300 text-sm">Open to collaboration</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                <span className="text-zinc-300 text-sm">Seeking internship opportunities</span>
                            </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-indigo-600/10 border border-indigo-600/20 rounded-lg">
                            <p className="text-sm text-indigo-300">
                                💡 Looking for exciting opportunities to grow and contribute to innovative projects!
                            </p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-zinc-950/50 rounded-xl border border-zinc-800 p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link 
                                href="/about" 
                                className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
                            >
                                <span>→</span>
                                <span>Learn more about me</span>
                            </Link>
                            <Link 
                                href="/profile/amankmrg/projects" 
                                className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
                            >
                                <span>→</span>
                                <span>View my projects</span>
                            </Link>
                            <Link 
                                href="/profile/amankmrg/blog" 
                                className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
                            >
                                <span>→</span>
                                <span>Read my blog</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;