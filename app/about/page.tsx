import React from 'react'
import Link from 'next/link'

function About() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white text-3xl grid place-items-center font-bold">
          AK
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">About Me</h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Passionate Full Stack Developer with expertise in modern web technologies and a drive for creating innovative solutions.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Introduction */}
          <section className="bg-zinc-950/50 rounded-xl border border-zinc-800 p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
            <div className="space-y-4 text-zinc-300">
              <p>
                Hello! I'm <strong className="text-white">Aman Kumar</strong>, a dedicated Full Stack Developer currently pursuing my 
                <strong className="text-white"> Bachelor of Technology in Computer Science and Engineering</strong> at 
                Vellore Institute of Technology, Chennai. I'm passionate about creating innovative web solutions that make a difference.
              </p>
              <p>
                With a strong foundation in both frontend and backend technologies, I enjoy the complete process of bringing ideas 
                to life - from concept and design to deployment and maintenance. My goal is to build applications that are not only 
                functional but also provide exceptional user experiences.
              </p>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="bg-zinc-950/50 rounded-xl border border-zinc-800 p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">Technical Skills</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Frontend Development</h3>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-indigo-600/20 text-indigo-300 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Backend Development</h3>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Express.js', 'MySQL', 'PostgreSQL', 'Prisma', 'RESTful APIs'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-violet-600/20 text-violet-300 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Tools & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {['Git', 'GitHub', 'VS Code', 'Postman', 'Docker'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-fuchsia-600/20 text-fuchsia-300 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Programming Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'TypeScript', 'C++', 'C'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-green-600/20 text-green-300 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Experience & Projects */}
          <section className="bg-zinc-950/50 rounded-xl border border-zinc-800 p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">What I Do</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-600/20 text-indigo-300 grid place-items-center text-sm font-medium">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Full Stack Web Development</h3>
                  <p className="text-zinc-400 text-sm">
                    Building complete web applications from scratch using modern technologies like React, Next.js, Node.js, and databases.
                  </p>
                </div>
              </div>
              
              
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-fuchsia-600/20 text-fuchsia-300 grid place-items-center text-sm font-medium">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">API Development & Integration</h3>
                  <p className="text-zinc-400 text-sm">
                    Designing and developing RESTful APIs, integrating third-party services, and ensuring secure data handling.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <section className="bg-zinc-950/50 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-indigo-600/20 text-indigo-300 grid place-items-center text-sm">
                  📧
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Email</p>
                  <a href="mailto:amankmrg@gmail.com" className="text-white hover:text-indigo-400 transition">
                    amankmrg@gmail.com
                  </a>
                </div>
              </div>
              
              
              
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-fuchsia-600/20 text-fuchsia-300 grid place-items-center text-sm">
                  📍
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Location</p>
                  <p className="text-white">Chennai, India</p>
                </div>
              </div>
            </div>
            
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center w-full mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
            >
              Contact Me
            </Link>
          </section>

          {/* Education */}
          <section className="bg-zinc-950/50 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Education</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-white">B.Tech in Computer Science</h4>
                <p className="text-sm text-zinc-400">Vellore Institute of Technology</p>
                <p className="text-sm text-zinc-500">Chennai, India</p>
                <p className="text-sm text-zinc-500">2022 - 2026</p>
              </div>
            </div>
          </section>

          {/* Quick Links */}
          <section className="bg-zinc-950/50 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/profile/amankmrg/projects" className="block text-zinc-400 hover:text-white transition">
                → View My Projects
              </Link>
              <Link href="/profile/amankmrg/blog" className="block text-zinc-400 hover:text-white transition">
                → Read My Blog
              </Link>
              <Link href="/contact" className="block text-zinc-400 hover:text-white transition">
                → Get In Touch
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About;