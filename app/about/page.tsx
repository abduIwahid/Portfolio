import type { Metadata } from 'next';
import { ArrowUpRight, Check } from 'lucide-react';
import { profile } from '@/content/profile';
import { GitHubSnapshot } from '@/components/github-snapshot';
import { Reveal } from '@/components/reveal';

export const metadata: Metadata = {
  title: 'About',
  description: 'Background, experience, education, and technical interests of Abdul Wahid.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <>
    <section className="page-hero">
      <div className="container about-hero-row">
        {/* PFP with orbit rings */}
        <div className="about-pfp-wrap" aria-hidden="true">
          <div className="pfp-frame pfp-frame-about">
            <svg className="pfp-ring-svg" viewBox="0 0 296 296" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="148" cy="148" r="138" stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray="14 9" strokeLinecap="round" className="pfp-ring-outer"/>
              <circle cx="148" cy="148" r="126" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 18" strokeLinecap="round" className="pfp-ring-inner"/>
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
        <div className="page-heading">
          <p className="eyebrow">About me</p>
          <h1>Curious about the model.<br />Serious about the system.</h1>
          <p>{profile.summary}</p>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="container about-grid">
        <Reveal className="reveal-auto"><aside className="about-statement">
          <p className="eyebrow">What I care about</p>
          <h2>Good engineering makes technical work easier to trust.</h2>
          <p>I like projects where mathematical thinking meets practical implementation: define the task, build a sensible baseline, inspect errors, and explain the result without overselling it.</p>
          <div className="focus-list">{profile.focus.map((item) => <span key={item}><Check size={15} /> {item}</span>)}</div>
        </aside></Reveal>
        <div>
          <p className="eyebrow">Experience</p>
          <div className="timeline">{profile.experience.map((item) => <article className="timeline-item" key={item.title}><div className="timeline-period">{item.period}<br />{item.location}</div><div className="timeline-content"><h3>{item.title}</h3><p className="timeline-org">{item.organization}</p><ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul><a className="text-link" href="https://github.com/abduIwahid/MediSight-Healthcare-Platform" target="_blank" rel="noreferrer">Review project evidence <ArrowUpRight size={14} /></a></div></article>)}</div>
          <p className="eyebrow eyebrow-spaced">Education</p>
          <div className="timeline">{profile.educationHistory.map((item) => <article className="timeline-item" key={item.title}><div className="timeline-period">{item.period}</div><div className="timeline-content"><h3>{item.title}</h3><p className="timeline-org">{item.organization}</p><p>{item.detail}</p></div></article>)}</div>
          <p className="eyebrow eyebrow-spaced">Credentials</p>
          <div className="credential-grid">{profile.credentials.map((item, index) => <Reveal key={item.title} delay={(index % 3) * 90}><article className="credential-card"><span className="project-index">CERTIFICATE</span><h3>{item.title}</h3><p>{item.issuer}</p><p style={{ marginTop: 7 }}>{item.period}</p></article></Reveal>)}</div>
          <p className="eyebrow eyebrow-spaced">Community</p>
          <div className="timeline">{profile.activities.map((item) => <article className="timeline-item" key={item.title}><div className="timeline-period">{item.period}</div><div className="timeline-content"><h3>{item.title}</h3><p className="timeline-org">{item.organization}</p></div></article>)}</div>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <p className="eyebrow">Open-source footprint</p>
        <Reveal className="reveal-auto"><GitHubSnapshot /></Reveal>
      </div>
    </section>
  </>;
}
