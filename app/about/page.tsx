import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Check, Download, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/content/profile';
import { GitHubSnapshot } from '@/components/github-snapshot';
import { StackBand } from '@/components/stack-band';
import { Reveal } from '@/components/reveal';
import { HeroGlow } from '@/components/pointer-glow';
import { heroCutout } from '../hero-image';

export const metadata: Metadata = {
  title: 'About',
  description: 'Background, experience, education, and technical interests of Abdul Wahid.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <>
    <section className="hero hero-echo"><HeroGlow /><div className="container hero-stage">
      <p className="eyebrow hero-eyebrow">About me</p>
      <div className="hero-headline-wrap about-headline-wrap">
        <h1 className="hero-giant"><span className="hg-line hg-solid">Curious about the model.</span><span className="hg-line hg-faded">Serious about the system.</span></h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroCutout} alt="" aria-hidden="true" className="hero-cutout" />
        <span className="pfp-badge hero-badge">Available for Opportunities</span>
      </div>

      <p className="hero-copy hero-copy-center">{profile.summary}</p>
      <div className="hero-actions hero-actions-center"><Link className="button button-primary" href="/projects">Explore selected work <ArrowUpRight size={17} /></Link><a className="button button-secondary" href="/CV.pdf" download>Download CV <Download size={16} /></a></div>
      <div className="hero-socials hero-socials-center"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a><a href={`mailto:${profile.email}`}><Mail size={16} /> Email</a></div>
    </div></section>

    <section className="section"><div className="container"><Reveal className="reveal-auto"><div className="stats-strip"><div className="stat-item"><span className="stat-value">BS AI</span><span className="stat-label">COMSATS, Attock Campus</span></div><div className="stat-item"><span className="stat-value">ML + AI</span><span className="stat-label">Core technical interests</span></div><div className="stat-item"><span className="stat-value">8+</span><span className="stat-label">Projects documented here</span></div><div className="stat-item"><span className="stat-value">2026</span><span className="stat-label">ML internship experience</span></div></div></Reveal><p className="fine-print">Project count reflects the currently documented portfolio, not an independent measure of impact. Details and limits are provided on each project page.</p></div></section>

    <StackBand />

    <section className="section"><div className="container"><Reveal className="reveal-auto"><div className="section-heading"><div><p className="eyebrow">What I care about</p><h2>Good engineering makes technical work easier to trust.</h2></div><p>I like projects where mathematical thinking meets practical implementation: define the task, build a sensible baseline, inspect errors, and explain the result without overselling it.</p></div></Reveal><div className="principles-grid focus-grid">{profile.focus.map((item, index) => <Reveal key={item} delay={index * 90}><article className="principle-card"><span className="principle-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h3>{item}<Check size={20} /></h3></article></Reveal>)}</div></div></section>

    <section className="section"><div className="container"><Reveal className="reveal-auto"><div className="section-heading"><div><h2>Experience</h2></div></div></Reveal><div className="about-col"><div className="timeline">{profile.experience.map((item) => <article className="timeline-item" key={item.title}><div className="timeline-period">{item.period}<br />{item.location}</div><div className="timeline-content"><h3>{item.title}</h3><p className="timeline-org">{item.organization}</p><ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>{item.organization.startsWith('Ezitech') && <a className="text-link" href="https://github.com/abduIwahid/WhyRisk" target="_blank" rel="noreferrer">Review project evidence <ArrowUpRight size={14} /></a>}</div></article>)}</div></div></div></section>

    <section className="section"><div className="container"><Reveal className="reveal-auto"><div className="section-heading"><div><h2>Education</h2></div></div></Reveal><div className="about-col"><div className="timeline">{profile.educationHistory.map((item) => <article className="timeline-item" key={item.title}><div className="timeline-period">{item.period}</div><div className="timeline-content"><h3>{item.title}</h3><p className="timeline-org">{item.organization}</p><p>{item.detail}</p></div></article>)}</div></div></div></section>

    <section className="section"><div className="container"><Reveal className="reveal-auto"><div className="section-heading"><div><h2>Credentials</h2></div></div></Reveal><div className="about-col"><div className="credential-grid">{profile.credentials.map((item, index) => <Reveal key={item.title} delay={(index % 3) * 90}><article className="credential-card"><span className="project-index">Certificate</span><h3>{item.title}</h3><p>{item.issuer}</p><p style={{ marginTop: 7 }}>{item.period}</p><a className="text-link credential-verify" href={item.verify} target="_blank" rel="noopener noreferrer">Verify certificate <ArrowUpRight size={14} /></a></article></Reveal>)}</div></div></div></section>

    <section className="section"><div className="container"><Reveal className="reveal-auto"><div className="section-heading"><div><h2>Community</h2></div></div></Reveal><div className="about-col"><div className="timeline">{profile.activities.map((item) => <article className="timeline-item" key={item.organization}><div className="timeline-period">{item.period}</div><div className="timeline-content"><h3>{item.title}</h3><p className="timeline-org">{item.organization}</p>{'proof' in item && item.proof && <a className="text-link timeline-proof" href={item.proof} target="_blank" rel="noopener noreferrer">Participation certificate <ArrowUpRight size={14} /></a>}</div></article>)}</div></div></div></section>

    <section className="section"><div className="container"><Reveal className="reveal-auto"><div className="section-heading"><div><h2>Open-source footprint</h2></div></div></Reveal><Reveal className="reveal-auto"><GitHubSnapshot /></Reveal></div></section>
  </>;
}
