import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, Github, Linkedin, Mail } from 'lucide-react';
import { projects } from '@/content/projects';
import { articles } from '@/content/articles';
import { profile } from '@/content/profile';
import { ProjectShot } from '@/components/project-shot';
import { Reveal } from '@/components/reveal';

const HOME_PROJECT_SLUGS = ['medisight-ai', 'customer-churn-prediction', 'study-hub', 'nearsend'];
const homeProjects = HOME_PROJECT_SLUGS.map((slug) => projects.find((p) => p.slug === slug)!).filter(Boolean);

export default function HomePage() {
  return <>
    <section className="hero"><div className="container hero-split">
      <div className="hero-main"><p className="eyebrow">AI/ML Developer</p><h1>Make the model.<br /><em>Question the result.</em></h1><p className="hero-copy">I&apos;m <strong>Abdul Wahid</strong>, an Artificial Intelligence undergraduate building practical machine-learning systems, explainable workflows, and software around data.</p><div className="hero-actions"><Link className="button button-primary" href="/projects">Explore selected work <ArrowUpRight size={17} /></Link><Link className="button button-secondary" href="/cv">View CV <ArrowRight size={16} /></Link></div><div className="hero-socials"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a><a href={`mailto:${profile.email}`}><Mail size={16} /> Email</a></div></div>

      {/* Profile picture — floating ring + availability badge */}
      <div className="hero-pfp-wrap" aria-hidden="true">
        <div className="pfp-frame">
          <svg className="pfp-ring-svg" viewBox="0 0 296 296" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer slow-spinning dashed ring */}
            <circle cx="148" cy="148" r="138" stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray="14 9" strokeLinecap="round" className="pfp-ring-outer"/>
            {/* Inner faster counter-rotating dotted ring */}
            <circle cx="148" cy="148" r="126" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 18" strokeLinecap="round" className="pfp-ring-inner"/>
            {/* Small orbit dot on the outer ring */}
            <circle cx="148" cy="10" r="3.5" fill="var(--border-strong)" className="pfp-orbit-dot"/>
          </svg>
          <div className="pfp-img-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://avatars.githubusercontent.com/abduIwahid"
              alt="Abdul Wahid"
              className="pfp-img"
              width={200}
              height={200}
            />
          </div>
        </div>
        <span className="pfp-badge">Available for roles</span>
      </div>
    </div></section>

    <section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">Selected work</p><h2>Projects with a point of view.</h2></div><div><p>Not just a stack of technologies. Each case study explains the problem, the approach, the evidence, and what remains uncertain.</p><Link className="text-link" href="/projects">Explore all projects <ArrowUpRight size={16} /></Link></div></div><div className="project-grid">{homeProjects.map((project, index) => <Reveal key={project.slug} delay={(index % 3) * 90}><article className={`project-card project-${project.accent}`}>{project.demo && <ProjectShot demo={project.demo} name={project.name} />}<div className="project-card-top"><span className="project-index">{String(index + 1).padStart(2, '0')}</span><span className="project-kind">{project.category}</span><div className="project-card-top-actions">{project.repo && <a href={project.repo} target="_blank" rel="noreferrer" className="project-github-btn" aria-label={`GitHub repo for ${project.name}`}><Github size={15} /></a>}{project.demo ? <a href={project.demo} target="_blank" rel="noreferrer" className="project-arrow project-arrow-link" aria-label={`Live demo of ${project.name}`}><ArrowUpRight size={19} /></a> : <span className="project-arrow"><ArrowUpRight size={19} /></span>}</div></div><div className="project-card-body"><p className="project-overline">{project.kind}</p><h2><Link href={`/projects/${project.slug}`}>{project.name}</Link></h2><p className="project-summary">{project.summary}</p><div className="tag-row">{project.stack.slice(0, 4).map((tag) => <span className="tag" key={tag}>{tag}</span>)}{project.stack.length > 4 && <span className="tag more-tag">+{project.stack.length - 4}</span>}</div></div><div className="project-card-bottom"><span>{project.status}</span><span className="project-card-actions">{project.demo && <a className="project-live-btn" href={project.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={13} /></a>}<Link href={`/projects/${project.slug}`}>Read case study <ArrowUpRight size={15} /></Link></span></div></article></Reveal>)}</div></div></section>


    <section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">Working principles</p><h2>Useful beats impressive-looking.</h2></div><p>My goal is to make work that can be read, questioned, and improved by someone other than its author.</p></div><div className="principles-grid"><article className="principle-card"><span className="principle-number">01</span><h3>Measure what matters</h3><p>Choose evaluation criteria that reflect the actual problem. A headline metric is a starting point, not a conclusion.</p></article><article className="principle-card"><span className="principle-number">02</span><h3>Explain the limits</h3><p>Show assumptions, weak spots, and the difference between a prototype and a validated system.</p></article><article className="principle-card"><span className="principle-number">03</span><h3>Ship the whole thing</h3><p>Connect notebooks and models to clear interfaces, reproducible workflows, and usable documentation.</p></article></div></div></section>

    <section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">Field notes</p><h2>Writing for better decisions.</h2></div><p>Short, research-informed notes on model evaluation, explainability, and responsible AI engineering.</p></div><div className="writing-list">{articles.map((article) => <article className="writing-row" key={article.slug}><div className="writing-meta">{article.category}<br />{article.readTime}</div><div className="writing-main"><h3 className="writing-title"><Link href={`/writing/${article.slug}`}>{article.title}</Link></h3><p className="writing-deck">{article.deck}</p></div><Link className="writing-arrow" href={`/writing/${article.slug}`} aria-label={`Read ${article.title}`}><ArrowUpRight size={18} /></Link></article>)}</div><div style={{ marginTop: 22 }}><Link className="text-link" href="/writing">Browse all writing <ArrowUpRight size={16} /></Link></div></div></section>

    <section className="section"><div className="container"><div className="stats-strip"><div className="stat-item"><span className="stat-value">BS AI</span><span className="stat-label">COMSATS · Attock Campus</span></div><div className="stat-item"><span className="stat-value">ML + AI</span><span className="stat-label">Core technical interests</span></div><div className="stat-item"><span className="stat-value">8+</span><span className="stat-label">Projects documented here</span></div><div className="stat-item"><span className="stat-value">2026</span><span className="stat-label">ML internship experience</span></div></div><p className="fine-print">Project count reflects the currently documented portfolio, not an independent measure of impact. Details and limits are provided on each project page.</p></div></section>

    <section className="section"><div className="container closing-cta"><div><p className="eyebrow">Open to conversations</p><h2>Have a problem worth<br className="desktop-only" /> thinking through?</h2><p>For AI/ML roles, research opportunities, and thoughtful collaboration.</p></div><div className="closing-actions"><Link className="button button-primary" href="/contact">Get in touch <ArrowUpRight size={17} /></Link><Link className="button button-secondary" href="/about"><BookOpen size={16} /> More about me</Link></div></div></section>
  </>;
}
