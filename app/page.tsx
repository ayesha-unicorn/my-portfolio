"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const scenes = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const skills = [
  "ASP.NET", ".NET Core", "MVC", "C#", "React", "HTML", "CSS",
  "SQL Server", "Web API", "RPA", "Automation Anywhere",
  "Git", "Azure DevOps", "Visual Studio"
];

const projects = [
  {
    title: "Employee Management Portal",
    description: "Web application to manage Employee Leave Data, Personal & Professional Information, Leave Apply and Approval workflows",
    tech: ["ASP.NET Core Web API", "React", "MS SQL Server"],
  },
  {
    title: "IT Help Desk",
    description: "Technical support request management system for tracking, prioritizing and resolving IT issues",
    tech: ["ASP.NET Core", "React JS", "SQL Server"],
  },
  {
    title: "Online Test Portal",
    description: "Online examination system for employee performance appraisal with exam scheduling and certificate generation",
    tech: ["ASP.NET", "JavaScript", "C#", "SQL Server"],
  },
  {
    title: "Customer Expected Price Bot",
    description: "Automation bot to read Outlook emails, download SAP reports and consolidate data into final Zedrix reports",
    tech: ["Automation Anywhere", "VBScript", "VBA", "SQL"],
  },
  {
    title: "Retailer Code Creation Bot",
    description: "Bot to download reports from efex site and create records in DMS system",
    tech: ["Automation Anywhere", "SQL", "Excel"],
  },
];

export default function Home() {
  const [activeScene, setActiveScene] = useState("hero");
  const [theme, setTheme] = useState("dark");
  const activeSceneRef = useRef("hero");
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const goToScene = useCallback((index: number) => {
    const safeIndex = Math.max(0, Math.min(index, scenes.length - 1));
    activeSceneRef.current = scenes[safeIndex].id;
    setActiveScene(scenes[safeIndex].id);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const currentIndex = scenes.findIndex((s) => s.id === activeSceneRef.current);
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      goToScene(currentIndex + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      goToScene(currentIndex - 1);
    }
  }, [goToScene]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;
    const currentIndex = scenes.findIndex((s) => s.id === activeSceneRef.current);
    const absDiffX = Math.abs(diffX);
    const absDiffY = Math.abs(diffY);
    const threshold = 50;
    
    if (absDiffX > threshold || absDiffY > threshold) {
      if (absDiffX > absDiffY) {
        diffX > 0 ? goToScene(currentIndex + 1) : goToScene(currentIndex - 1);
      } else {
        diffY > 0 ? goToScene(currentIndex + 1) : goToScene(currentIndex - 1);
      }
    }
  }, [goToScene]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div 
      className="relative w-full h-screen bg-[var(--bg-primary)] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation Dots */}
      <nav className="nav-dots">
        {scenes.map((scene) => (
          <button
            key={scene.id}
            onClick={() => setActiveScene(scene.id)}
            className={`nav-dot ${activeScene === scene.id ? "active" : ""}`}
            aria-label={scene.label}
          />
        ))}
      </nav>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center text-xl cursor-pointer z-50 transition-colors hover:border-[var(--accent)]"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      {/* Hero Scene */}
      <section
        className={`scene ${activeScene === "hero" ? "active" : ""}`}
        id="hero"
      >
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-purple-500 animate-float flex items-center justify-center text-4xl font-bold">
            MS
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent)] bg-clip-text text-transparent">
            Monika Sinha
          </h1>
          <p className="text-2xl md:text-3xl text-[var(--text-secondary)] mb-4">
            .NET Developer
          </p>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            5.5 years of experience in ASP.NET, .NET Core, MVC & RPA
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setActiveScene("projects")}
              className="px-6 py-3 bg-[var(--accent)] text-white rounded-full font-medium hover:bg-[var(--accent-hover)] transition-colors"
            >
              View My Work
            </button>
            <button
              onClick={() => setActiveScene("contact")}
              className="px-6 py-3 border border-[var(--border)] text-[var(--text-primary)] rounded-full font-medium hover:border-[var(--accent)] transition-colors"
            >
              Get In Touch
            </button>
          </div>
          <p className="mt-8 text-sm text-[var(--text-secondary)]">
            Use arrow keys, swipe or click dots to navigate
          </p>
        </div>
      </section>

      {/* About Scene */}
      <section
        className={`scene ${activeScene === "about" ? "active" : ""}`}
        id="about"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-8">
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
              I&apos;m a passionate .NET Developer with 5.5 years of experience in
              ASP.NET, .NET Core, MVC, and full-stack development. I specialize in
              building robust web applications and automating business processes.
            </p>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
              I&apos;ve worked with leading companies including Affinitive Infra,
              Calibrated Healthcare, and Brito IT Services. I&apos;m passionate about
              learning new technologies and contributing to innovative solutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-[var(--bg-tertiary)] rounded-xl">
                <div className="text-3xl font-bold text-[var(--accent)]">5.5+</div>
                <div className="text-[var(--text-secondary)]">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-[var(--bg-tertiary)] rounded-xl">
                <div className="text-3xl font-bold text-[var(--accent)]">5+</div>
                <div className="text-[var(--text-secondary)]">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-[var(--bg-tertiary)] rounded-xl">
                <div className="text-3xl font-bold text-[var(--accent)]">RPA</div>
                <div className="text-[var(--text-secondary)]">Certified Professional</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Scene */}
      <section
        className={`scene ${activeScene === "skills" ? "active" : ""}`}
        id="skills"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Skills & Technologies</h2>
          <p className="text-center text-[var(--text-secondary)] mb-8">
            Technologies I work with daily
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Backend</h3>
              <p className="text-[var(--text-secondary)]">
                ASP.NET, .NET Core, MVC, C#, Web API, SQL Server
              </p>
            </div>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Frontend</h3>
              <p className="text-[var(--text-secondary)]">
                React JS, HTML, CSS, JavaScript
              </p>
            </div>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">RPA & Automation</h3>
              <p className="text-[var(--text-secondary)]">
                Automation Anywhere, UiPath, VBScript, VBA
              </p>
            </div>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Tools & Others</h3>
              <p className="text-[var(--text-secondary)]">
                Visual Studio 2022, SQL Server, Swagger, Git, Azure DevOps
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Scene */}
      <section
        className={`scene ${activeScene === "projects" ? "active" : ""}`}
        id="projects"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 bg-[var(--bg-tertiary)] rounded-md text-[var(--accent)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Scene */}
      <section
        className={`scene ${activeScene === "contact" ? "active" : ""}`}
        id="contact"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Have a project in mind or just want to chat? I&apos;d love to hear from you.
          </p>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-8">
            <div className="space-y-4 mb-6">
              <a
                href="mailto:monasinha9577@gmail.com"
                className="flex items-center gap-4 p-4 bg-[var(--bg-tertiary)] rounded-xl hover:border-[var(--accent)] border border-transparent transition-colors"
              >
                <span className="text-2xl">📧</span>
                <span>monasinha9577@gmail.com</span>
              </a>
              <a
                href="tel:+918770776909"
                className="flex items-center gap-4 p-4 bg-[var(--bg-tertiary)] rounded-xl hover:border-[var(--accent)] border border-transparent transition-colors"
              >
                <span className="text-2xl">📱</span>
                <span>+918770776909</span>
              </a>
              <a
                href="https://www.linkedin.com/in/monika-sinha-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[var(--bg-tertiary)] rounded-xl hover:border-[var(--accent)] border border-transparent transition-colors"
              >
                <span className="text-2xl">💼</span>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/ayesha-unicorn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[var(--bg-tertiary)] rounded-xl hover:border-[var(--accent)] border border-transparent transition-colors"
              >
                <span className="text-2xl">💻</span>
                <span>GitHub</span>
              </a>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              Currently available for freelance opportunities
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}