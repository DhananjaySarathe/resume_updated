'use client'

import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  ExternalLink,
  Code,
  Briefcase,
  GraduationCap,
  User,
  Cpu,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Zap,
  Globe,
  Database,
  Layout,
  Send,
  MapPin,
  Terminal,
  Coffee
} from 'lucide-react';

const ResumeWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Resume Data
  const personalInfo = {
    name: "Dhananjay Sarathe",
    title: "Founding Member Quickads | Software Development Engineer",
    bio: "I am a Full Stack Engineer with a passion for building scalable, AI-driven applications. As a Founding Member at Quickads, I've driven 0→1 development, scaled architectures, and integrated complex AI models into user-friendly products. I specialize in Next.js ecosystems and performance optimization.",
    contact: {
      phone: "+91 9009990470",
      email: "dhananjaysarathe26@gmail.com",
      location: "Bengaluru, India"
    },
    socials: {
      linkedin: "https://www.linkedin.com/in/dhananjay-sarathe-835434149/",
      github: "https://github.com/DhananjaySarathe",
      leetcode: "https://leetcode.com/dhananjaysarathe26/"
    }
  };

  // Extrapolated "Services" based on Resume Skills
  const services = [
    {
      title: "Frontend Architecture",
      icon: Layout,
      desc: "Building scalable, high-performance UI/UX using Next.js and React. Reduced page load times by 30% in production environments."
    },
    {
      title: "AI Integration",
      icon: Sparkles,
      desc: "Integrating LLMs (OpenAI) and Vision APIs into web apps. Experience creating prompt-to-ad generation workflows and analytic agents."
    },
    {
      title: "Full Stack Development",
      icon: Database,
      desc: "End-to-end development from database design to frontend implementation. Proficient in ensuring seamless data flow and state management."
    },
    {
      title: "Web Scraping & Automation",
      icon: Globe,
      desc: "Building complex scrapers (SPY Agents) for competitive analysis and real-time data gathering across multiple platforms."
    }
  ];

  const experiences = [
    {
      company: "Quickads",
      role: "Founding Member (SDE)",
      period: "Jan 2025 - Present",
      location: "Bengaluru",
      description: "Co-founded and scaled AI-driven AdTech startup. Building an ecosystem for research, creation, and publishing of ads on Meta.",
      achievements: [
        "Designed and implemented a Next.js-based scalable frontend architecture, reducing page load times by 30% and enabling multi-domain integrations.",
        "Built Ad Inspiration Library with 1M+ ads indexed, improving marketers' ability to research ad trends.",
        "Developed the Discover feature, allowing users to search ads across multiple platforms with powerful filters for precise targeting.",
        "Implemented a real-time Live Search system to scrape and analyze Meta ads, providing detailed insights (e.g., quality rating, hook identification, transcriptions).",
        "Developed Eve, an analytics module integrating with Meta accounts to provide deep, actionable campaign insights by categorizing creatives into 4 marketing funnels.",
        "Created ADAM (SPY Agents) that performs daily live scraping of competitor brands/keywords, providing users with fresh competitive insights along with automated performance analysis."
      ]
    },
    {
      company: "88 Ventures / Quickads",
      role: "Software Engineering Intern (Founding Team)",
      period: "Aug 2023 - Dec 2024",
      location: "Remote",
      description: "Contributed as founding engineer during product inception, driving 0→1 development.",
      achievements: [
        "Built core frontend components with Next.js + TypeScript, ensuring scalability and reusability across modules.",
        "Integrated AI models (OpenAI, Vision APIs) into ad-creation workflows, enabling prompt-to-ad generation.",
        "Established design system & reusable UI kit, improving development speed by 40%.",
        "Worked closely with founding members to define MVP features, accelerate product-market fit, and onboard early adopters."
      ]
    },
    {
      company: "Coding Ninjas",
      role: "Teaching Assistant (Intern)",
      period: "Sep 2022 - Jan 2023",
      location: "Remote",
      description: "Mentored students in computer science fundamentals.",
      achievements: [
        "Mentored 100+ students in C++ and Data Structures, improving problem-solving accuracy.",
        "Conducted 1:1 debugging sessions focusing on error detection, optimization, and best practices."
      ]
    }
  ];

  const projects = [
    {
      title: "ExpenseWaale",
      category: "FinTech Web App",
      description: "A simple and powerful expense-splitting web app with group finance management.",
      tech: ["Full Stack", "Database", "Analytics"],
      url: "https://expensewalle.vercel.app/",
      github: "",
      points: [
        "Built a full-stack web application with a proper database to manage shared expenses across multiple groups using a 'SplitSpaces' system, enabling users to maintain separate expense groups for flats, trips, or events.",
        "Implemented expense categorization, real-time balance/settlement calculations, PDF export, email report delivery, and advanced filtering across dates, members, and categories.",
        "Built analytics modules for spending insights, category-wise consumption, contributor rankings, and fairness scoring to improve visibility and decision-making."
      ]
    },
    {
      title: "Prunify",
      category: "Developer Tool / CLI",
      description: "AI-assisted Node.js CLI for codebase cleanup and dependency analysis.",
      tech: ["Node.js", "TypeScript", "AST/Graph Analysis"],
      url: "https://www.npmjs.com/package/prunify",
      github: "",
      points: [
        "Engineered a zero-config Node.js CLI tool that constructs an import graph to automatically detect dead exports, dependency cycles, unused public assets, and npm package drift in TS/JS codebases.",
        "Designed a deterministic analysis engine that isolates logic constraints from LLM execution, generating a structured ai_prompt.tsx to safely hand off duplicate code clustering to Copilot/Cursor without hallucination risks.",
        "Implemented automated CI/CD pipeline gating (--ci flag) to prevent technical debt accumulation, alongside an interactive terminal interface generating comprehensive HTML health reports."
      ]
    },
    {
      title: "StockTax Pro",
      category: "Tax Planning Platform",
      description: "Tax optimization platform for Indian traders with multi-broker support and GPT-assisted recommendations.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Zustand", "SheetJS", "GPT-4o-mini"],
      url: "https://stock-tax-pro.vercel.app/",
      github: "",
      points: [
        "Built a multi-broker tax engine supporting AngelOne, Zerodha, and Upstox — auto-detecting file formats, normalizing trades across brokers under one PAN, and computing consolidated STCG/LTCG liability with pre/post July 2024 tax rate awareness.",
        "Engineered a Tax Loss Harvesting optimizer that scores unrealized loss positions and recommends minimum stocks to sell for maximum tax offset — accounting for Indian offset rules, brokerage costs, and holding period proximity to LTCG conversion.",
        "Integrated GPT-4o-mini to deliver personalized harvest recommendations — flagging missed exemptions, wash sale risks, and optimal timing based on each user's portfolio.",
        "Built a Tax Simulation engine with what-if trade modeling, advance tax planning (Section 234B/234C), and scenario comparison to project year-end liability before executing trades."
      ]
    }
  ];

  const skills = [
    { category: "Languages", items: ["C/C++", "Python", "JavaScript", "TypeScript", "HTML+CSS"] },
    { category: "Frameworks", items: ["React.js", "Next.js", "Tailwind CSS"] },
    { category: "Tools & AI", items: ["Git/GitHub", "OpenAI API", "System Design", "Vision APIs", "Web Scraping"] }
  ];

  // Handle scroll & mouse effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'services', 'experience', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 400) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
    const body = encodeURIComponent(
      `Hello Dhananjay,\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    const mailtoLink = `mailto:${personalInfo.contact.email}?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Reset form after a short delay
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const NavLink = ({ id, label }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${activeSection === id ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
        }`}
    >
      {label}
      {activeSection === id && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_10px_cyan] rounded-full"></span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden">

      {/* --- Ambient Background Effects --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_20%,transparent_100%)]"></div>
        <div
          className="hidden md:block absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-100 ease-out"
          style={{ left: mousePos.x, top: mousePos.y }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight text-white cursor-pointer flex items-center gap-2" onClick={() => scrollToSection('home')}>
            <Terminal size={20} className="text-cyan-400" />
            <span>Dhananjay<span className="text-cyan-400">.</span></span>
          </div>

          <div className="hidden md:flex items-center space-x-1 bg-white/5 px-2 py-1 rounded-full border border-white/5 backdrop-blur-sm">
            <NavLink id="home" label="Home" />
            <NavLink id="about" label="About" />
            <NavLink id="services" label="What I Do" />
            <NavLink id="experience" label="Experience" />
            <NavLink id="projects" label="Projects" />
            <NavLink id="contact" label="Contact" />
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-white/10 p-4 flex flex-col space-y-4 shadow-2xl">
            {['home', 'about', 'services', 'experience', 'projects', 'contact'].map(item => (
              <button key={item} onClick={() => scrollToSection(item)} className="text-left text-slate-300 capitalize py-2 border-b border-white/5">
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative z-10 pt-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8">
            <div className="inline-block px-3 py-1 text-xs font-mono text-cyan-400 bg-cyan-950/30 rounded border border-cyan-800/50">
              Hello World, I'm
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Dhananjay <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Sarathe</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
              Founding Member at Quickads. I build scalable, AI-driven ecosystems and high-performance web applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollToSection('projects')} className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                View My Work
              </button>
              <a href="https://drive.google.com/file/d/1rbqqwgv6kbOiYPGGvVe-xBZfqyIHPD4k/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg border border-white/10 transition-all flex items-center gap-2">
                <Download size={18} /> Resume
              </a>
            </div>
            <div className="flex gap-6 pt-4 text-slate-500">
              <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Github className="cursor-pointer" />
              </a>
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Linkedin className="cursor-pointer" />
              </a>
              <a href={personalInfo.socials.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Code className="cursor-pointer" />
              </a>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative hidden md:flex justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-4 border border-white/10 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#111] p-6 rounded-2xl border border-white/10 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="space-y-2 font-mono text-xs text-slate-400">
                    <p><span className="text-purple-400">const</span> <span className="text-yellow-400">developer</span> = <span className="text-cyan-400">{`{`}</span></p>
                    <p className="pl-4">name: <span className="text-green-400">"Dhananjay"</span>,</p>
                    <p className="pl-4">role: <span className="text-green-400">"SDE"</span>,</p>
                    <p className="pl-4">company: <span className="text-green-400">"Quickads"</span>,</p>
                    <p className="pl-4">skills: [<span className="text-green-400">"Next.js"</span>, <span className="text-green-400">"AI"</span>]</p>
                    <p><span className="text-cyan-400">{`}`}</span>;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-600 cursor-pointer" onClick={() => scrollToSection('about')}>
          <ChevronDown size={24} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative z-10 bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-20 blur-xl"></div>
              <div className="relative bg-[#111] p-8 rounded-xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.flatMap(s => s.items).map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-sm text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:w-1/2 space-y-6">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm tracking-wider uppercase">
                <User size={16} /> About Me
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Turning Complex Problems into <span className="text-cyan-400">Elegant Solutions</span></h2>
              <p className="text-slate-400 leading-relaxed text-lg">
                {personalInfo.bio}
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <h4 className="text-3xl font-bold text-white">1M+</h4>
                  <p className="text-sm text-slate-500 mt-1">Ads Indexed</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white">30%</h4>
                  <p className="text-sm text-slate-500 mt-1">Performance Boost</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services / What I Do */}
      <section id="services" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What I Do</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">I combine engineering principles with creative design to deliver robust applications.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="group p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-24 relative z-10 bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 mb-12">
            <Briefcase className="text-cyan-400" size={24} />
            <h2 className="text-3xl font-bold text-white">Experience</h2>
          </div>

          <div className="space-y-12 relative border-l border-white/10 ml-3 md:ml-8 pl-8 md:pl-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative group">
                <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-5 h-5 rounded-full bg-[#080808] border-2 border-cyan-500/50 group-hover:border-cyan-400 group-hover:scale-125 transition-all"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                    <p className="text-cyan-400 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm font-mono text-slate-500 bg-white/5 px-3 py-1 rounded mt-2 md:mt-0 w-fit">
                    {exp.period}
                  </span>
                </div>

                <p className="text-slate-300 mb-4 text-lg">{exp.description}</p>

                <ul className="space-y-2">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="text-slate-400 text-sm flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-cyan-500 rounded-full shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Code className="text-cyan-400" size={24} />
                <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
              </div>
              <p className="text-slate-400">Some things I've built.</p>
            </div>
            <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
              View Github <ExternalLink size={14} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300">
                <div className="p-8 relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-xs font-mono text-cyan-400 mb-2 block">{project.category}</span>
                      {project.url ? (
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                        </a>
                      ) : (
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                      )}
                    </div>
                    <div className="flex gap-3">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white text-slate-400 transition-colors"><Github size={18} /></a>
                      )}
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white text-slate-400 transition-colors"><ExternalLink size={18} /></a>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-400 mb-6 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tag, i) => (
                      <span key={i} className="text-xs font-mono text-slate-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative z-10 bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-sm mb-6">
                <Coffee size={16} /> Let's Chat
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
              <p className="text-slate-400 text-lg mb-12">
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-cyan-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Email</p>
                    <a href={`mailto:${personalInfo.contact.email}`} className="text-white font-medium hover:text-cyan-400 transition-colors">
                      {personalInfo.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-cyan-400">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Phone</p>
                    <a href={`tel:${personalInfo.contact.phone.replace(/\s/g, '')}`} className="text-white font-medium hover:text-cyan-400 transition-colors">
                      {personalInfo.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-cyan-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Location</p>
                    <p className="text-white font-medium">{personalInfo.contact.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Contact Form */}
            <div className="bg-[#111] p-8 rounded-3xl border border-white/5 shadow-2xl">
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-500 uppercase font-bold">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all placeholder:text-slate-600"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-500 uppercase font-bold">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all placeholder:text-slate-600"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-500 uppercase font-bold">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all placeholder:text-slate-600"
                    placeholder="Project Inquiry"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-500 uppercase font-bold">Message</label>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all placeholder:text-slate-600 resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(8,145,178,0.4)] transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Opening Email...
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} Dhananjay Sarathe. All rights reserved.</p>
            <p className="flex items-center gap-1">Designed with <Sparkles size={12} className="text-cyan-400" /> in React</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumeWebsite;

