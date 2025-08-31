const items = {
  blogs: [
    {
      id: 1,
      title: "The Future of Web Development",
      description: "Exploring new trends like AI in coding and server-side components.",
      category: "Blogs",
      details: ["Author: Jane Doe", "Date: 2024-08-01"]
    },
    {
      id: 2,
      title: "A Guide to React Hooks",
      description: "A deep dive into useState, useEffect, and custom hooks.",
      category: "Blogs",
      details: ["Author: John Smith", "Date: 2024-07-25"]
    },
    {
      id: 3,
      title: "Demystifying CSS Grid",
      description: "How to build responsive layouts with CSS Grid and Flexbox.",
      category: "Blogs",
      details: ["Author: Emily White", "Date: 2024-07-18"]
    },
    {
      id: 4,
      title: "State Management in Angular",
      description: "Comparing NgRx and Signals for robust state management.",
      category: "Blogs",
      details: ["Author: Michael Brown", "Date: 2024-07-10"]
    },
    {
      id: 5,
      title: "Building Accessible Web Components",
      description: "Best practices for creating inclusive web experiences.",
      category: "Blogs",
      details: ["Author: Sarah Jones", "Date: 2024-07-05"]
    },
    {
      id: 6,
      title: "Optimizing Web Performance",
      description: "Techniques to make your website faster and more efficient.",
      category: "Blogs",
      details: ["Author: David Lee", "Date: 2024-06-29"]
    },
    {
      id: 7,
      title: "Introduction to TypeScript",
      description: "Understanding static typing and its benefits in JavaScript development.",
      category: "Blogs",
      details: ["Author: Laura Miller", "Date: 2024-06-20"]
    },
    {
      id: 8,
      title: "Working with REST APIs",
      description: "How to fetch and manage data from external APIs.",
      category: "Blogs",
      details: ["Author: Chris Evans", "Date: 2024-06-15"]
    },
    {
      id: 9,
      title: "Understanding Asynchronous JavaScript",
      description: "Promises, async/await, and the event loop explained.",
      category: "Blogs",
      details: ["Author: Megan Clark", "Date: 2024-06-08"]
    },
    {
      id: 10,
      title: "Full-stack with Node.js and Express",
      description: "Setting up a simple server and API with Node.js.",
      category: "Blogs",
      details: ["Author: Daniel Wilson", "Date: 2024-06-01"]
    }
  ],
  projects: [
    {
      id: 1,
      title: "E-commerce Website",
      description: "A full-stack e-commerce platform built with React and Node.js.",
      category: "Projects",
      details: ["Technologies: React, Node.js, Express, MongoDB"]
    },
    {
      id: 2,
      title: "Weather App",
      description: "A mobile-first weather application fetching data from a public API.",
      category: "Projects",
      details: ["Technologies: React Native, OpenWeatherMap API"]
    },
    {
      id: 3,
      title: "Task Management Tool",
      description: "A Kanban-style task board with drag-and-drop functionality.",
      category: "Projects",
      details: ["Technologies: Angular, TypeScript, Firebase"]
    },
    {
      id: 4,
      title: "Personal Portfolio",
      description: "A responsive portfolio website to showcase my skills and projects.",
      category: "Projects",
      details: ["Technologies: HTML, CSS, JavaScript"]
    },
    {
      id: 5,
      title: "Chat Application",
      description: "A real-time chat app with user authentication and group chats.",
      category: "Projects",
      details: ["Technologies: React, Firebase Firestore, WebSockets"]
    },
    {
      id: 6,
      title: "Recipe Finder",
      description: "An app that finds recipes based on user-provided ingredients.",
      category: "Projects",
      details: ["Technologies: Vue.js, Edamam API"]
    },
    {
      id: 7,
      title: "Blog Platform",
      description: "A content management system for creating and publishing blog posts.",
      category: "Projects",
      details: ["Technologies: Next.js, Markdown, GraphQL"]
    },
    {
      id: 8,
      title: "Music Player",
      description: "A web-based music player with a clean UI and playback controls.",
      category: "Projects",
      details: ["Technologies: HTML, CSS, JavaScript, Tone.js"]
    },
    {
      id: 9,
      title: "Movie Searcher",
      description: "An app to search for movies and view their details.",
      category: "Projects",
      details: ["Technologies: React, MovieDB API"]
    },
    {
      id: 10,
      title: "Fitness Tracker",
      description: "An application to log workouts and track fitness progress.",
      category: "Projects",
      details: ["Technologies: Svelte, Chart.js, Local Storage"]
    }
  ],
  experience: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      description: "Led the development of a new customer-facing dashboard using React.",
      category: "Experience",
      details: ["Company: Tech Solutions Inc.", "Duration: Jan 2022 - Present"]
    },
    {
      id: 2,
      title: "Frontend Developer",
      description: "Developed and maintained web applications using Angular and TypeScript.",
      category: "Experience",
      details: ["Company: Innovate Web Group", "Duration: June 2019 - Dec 2021"]
    },
    {
      id: 3,
      title: "Junior Web Developer",
      description: "Assisted in building responsive websites with HTML, CSS, and JavaScript.",
      category: "Experience",
      details: ["Company: Digital Creations Co.", "Duration: Aug 2018 - May 2019"]
    },
    {
      id: 4,
      title: "UI/UX Designer",
      description: "Designed and prototyped user interfaces for mobile applications.",
      category: "Experience",
      details: ["Company: Global Tech Services", "Duration: May 2017 - Aug 2018"]
    },
    {
      id: 5,
      title: "Software Engineer Intern",
      description: "Contributed to the development of a new internal tool.",
      category: "Experience",
      details: ["Company: Startup Co.", "Duration: May 2016 - Aug 2016"]
    },
    {
      id: 6,
      title: "Graphic Designer",
      description: "Designed marketing materials including brochures and social media graphics.",
      category: "Experience",
      details: ["Company: Creative Agency", "Duration: Sep 2015 - Apr 2016"]
    },
    {
      id: 7,
      title: "Full-stack Developer",
      description: "Built custom websites for various clients from scratch.",
      category: "Experience",
      details: ["Company: Freelance", "Duration: 2019 - Present"]
    },
    {
      id: 8,
      title: "Developer",
      description: "Contributed to open-source projects on GitHub.",
      category: "Experience",
      details: ["Company: Open Source Contributor", "Duration: 2020 - Present"]
    },
    {
      id: 9,
      title: "Student",
      description: "Completed an intensive full-stack web development program.",
      category: "Experience",
      details: ["Company: Coding Bootcamp", "Duration: Jan 2018 - July 2018"]
    },
    {
      id: 10,
      title: "Teaching Assistant",
      description: "Assisted professors with grading and class preparation.",
      category: "Experience",
      details: ["Company: University of Technology", "Duration: Sep 2016 - May 2017"]
    }
  ]
};


export default items;