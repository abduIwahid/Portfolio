import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, Github, Linkedin, Mail } from 'lucide-react';
import { projects } from '@/content/projects';
import { articles } from '@/content/articles';
import { profile } from '@/content/profile';
import { ProjectShot } from '@/components/project-shot';
import { Reveal } from '@/components/reveal';
import { heroCutout } from './hero-image';

const HOME_PROJECT_SLUGS = ['medisight-ai', 'customer-churn-prediction', 'study-hub', 'nearsend'];
const homeProjects = HOME_PROJECT_SLUGS.map((slug) => projects.find((p) => p.slug === slug)!).filter(Boolean);

export default function HomePage() {
  return <>
    <section className="hero hero-echo"><div className="container hero-stage">
      <p className="eyebrow hero-eyebrow">AI/ML Developer</p>
      <div className="hero-headline-wrap">
        <h1 className="hero-giant"><span className="hg-line hg-solid">Make the model.</span><span className="hg-line hg-faded">Question the result.</span></h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroCutout} alt="" aria-hidden="true" className="hero-cutout" />
        <span className="pfp-badge hero-badge">Available for roles</span>
      </div>

      <p className="hero-copy hero-copy-center">I&apos;m <strong>Abdul Wahid</strong>, an Artificial Intelligence undergraduate building practical machine-learning systems, explainable workflows, and software around data.</p><div className="hero-actions hero-actions-center"><Link className="button button-primary" href="/projects">Explore selected work <ArrowUpRight size={17} /></Link><Link className="button button-secondary" href="/cv">View CV <ArrowRight size={16} /></Link></div><div className="hero-socials hero-socials-center"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a><a href={`mailto:${profile.email}`}><Mail size={16} /> Email</a></div>
    </div></section>

    <section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">Selected work</p><h2>Projects with a point of view.</h2></div><div><p>Not just a stack of technologies. Each case study explains the problem, the approach, the evidence, and what remains uncertain.</p><Link className="text-link" href="/projects">Explore all projects <ArrowUpRight size={16} /></Link></div></div><div className="project-grid">{homeProjects.map((project, index) => <Reveal key={project.slug} delay={(index % 3) * 90}><article className={`project-card project-${project.accent}`}>{project.demo && <ProjectShot demo={project.demo} name={project.name} />}<div className="project-card-top"><span className="project-card-name">{project.name}</span><div className="project-card-top-actions">{project.repo && <a href={project.repo} target="_blank" rel="noreferrer" className="project-github-btn" aria-label={`GitHub repo for ${project.name}`}><Github size={15} /></a>}<Link href={`/projects/${project.slug}`} className="project-arrow project-arrow-link" aria-label={`Read the case study of ${project.name}`}><ArrowUpRight size={19} /></Link></div></div><div className="project-card-body"><p className="project-summary">{project.summary}</p><div className="tag-row">{project.stack.slice(0, 4).map((tag) => <span className="tag" key={tag}>{tag}</span>)}{project.stack.length > 4 && <span className="tag more-tag">+{project.stack.length - 4}</span>}</div></div></article></Reveal>)}</div></div></section>


    <section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">Working principles</p><h2>Useful beats impressive-looking.</h2></div><p>My goal is to make work that can be read, questioned, and improved by someone other than its author.</p></div><div className="principles-grid"><article className="principle-card"><span className="principle-number">01</span><h3>Measure what matters</h3><p>Choose evaluation criteria that reflect the actual problem. A headline metric is a starting point, not a conclusion.</p></article><article className="principle-card"><span className="principle-number">02</span><h3>Explain the limits</h3><p>Show assumptions, weak spots, and the difference between a prototype and a validated system.</p></article><article className="principle-card"><span className="principle-number">03</span><h3>Ship the whole thing</h3><p>Connect notebooks and models to clear interfaces, reproducible workflows, and usable documentation.</p></article></div></div></section>

    <section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">Field notes</p><h2>Writing for better decisions.</h2></div><p>Short, research-informed notes on model evaluation, explainability, and responsible AI engineering.</p></div><div className="writing-list">{articles.map((article) => <article className="writing-row" key={article.slug}><div className="writing-meta">{article.category}<br />{article.readTime}</div><div className="writing-main"><h3 className="writing-title"><Link href={`/writing/${article.slug}`}>{article.title}</Link></h3><p className="writing-deck">{article.deck}</p></div><Link className="writing-arrow" href={`/writing/${article.slug}`} aria-label={`Read ${article.title}`}><ArrowUpRight size={18} /></Link></article>)}</div><div style={{ marginTop: 22 }}><Link className="text-link" href="/writing">Browse all writing <ArrowUpRight size={16} /></Link></div></div></section>

    <section className="section"><div className="container"><div className="stats-strip"><div className="stat-item"><span className="stat-value">BS AI</span><span className="stat-label">COMSATS · Attock Campus</span></div><div className="stat-item"><span className="stat-value">ML + AI</span><span className="stat-label">Core technical interests</span></div><div className="stat-item"><span className="stat-value">8+</span><span className="stat-label">Projects documented here</span></div><div className="stat-item"><span className="stat-value">2026</span><span className="stat-label">ML internship experience</span></div></div><p className="fine-print">Project count reflects the currently documented portfolio, not an independent measure of impact. Details and limits are provided on each project page.</p></div></section>

    <section className="section"><div className="container closing-cta closing-giant"><div><p className="eyebrow">Open to conversations</p><h2 className="closing-giant-title">Let&apos;s talk</h2><p>Have a problem worth thinking through? For AI/ML roles, research opportunities, and thoughtful collaboration.</p></div><div className="closing-actions"><Link className="button button-primary" href="/contact">Get in touch <ArrowUpRight size={17} /></Link><Link className="button button-secondary" href="/about"><BookOpen size={16} /> More about me</Link></div></div></section>
  </>;
}
