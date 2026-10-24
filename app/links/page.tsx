import type { Metadata } from 'next';
import { ArrowUpRight, Github, Linkedin, Mail, Instagram, BookOpen, Database, Code2 } from 'lucide-react';
import { profile } from '@/content/profile';
import { Reveal } from '@/components/reveal';

export const metadata: Metadata = {
  title: 'Links',
  description: 'All profile links and social accounts for Abdul Wahid — AI/ML Developer.',
  alternates: { canonical: '/links' },
};

const socialLinks = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@abduIwahid',
    description: 'Source code, projects, and open-source contributions.',
    href: profile.github,
    icon: Github,
    color: 'var(--foreground)',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'Abdul Wahid',
    description: 'Professional profile, experience, and work history.',
    href: profile.linkedin,
    icon: Linkedin,
    color: '#0077b5',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@xabdulwahid',
    description: 'Behind-the-scenes, personal updates, and creative work.',
    href: profile.instagram,
    icon: Instagram,
    color: '#e1306c',
  },
  {
    id: 'medium',
    label: 'Medium',
    handle: '@abdu1wahid',
    description: 'Writing on AI, machine learning, and software engineering.',
    href: profile.medium,
    icon: BookOpen,
    color: 'var(--foreground)',
  },
  {
    id: 'huggingface',
    label: 'HuggingFace',
    handle: 'abdu1wahid',
    description: 'Models, datasets, and AI experiments.',
    href: profile.huggingface,
    icon: Database,
    color: '#ff9d00',
  },
  {
    id: 'kaggle',
    label: 'Kaggle',
    handle: 'abdulwahid',
    description: 'Data science notebooks and competition entries.',
    href: profile.kaggle,
    icon: Code2,
    color: '#20beff',
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    handle: 'abdu1wahid',
    description: 'Problem-solving practice and algorithm challenges.',
    href: profile.leetcode,
    icon: Code2,
    color: '#ffa116',
  },
  {
    id: 'email',
    label: 'Email',
    handle: profile.email,
    description: 'Best way to reach me for collaboration or opportunities.',
    href: `mailto:${profile.email}`,
    icon: Mail,
    color: 'var(--accent)',
  },
];

export default function LinksPage() {
  return <>
    <section className="page-hero">
      <div className="container page-heading">
        <p className="eyebrow">Profiles &amp; links</p>
        <h1>Find me<br />across the web.</h1>
        <p>All my active profiles, writing channels, and direct contact in one place.</p>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <div className="links-grid">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Reveal key={link.id} className="reveal-fill" delay={(index % 4) * 70}><a
                key={link.id}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noreferrer'}
                className="links-card"
                id={`link-${link.id}`}
              >
                <div className="links-card-icon" style={{ '--link-color': link.color } as React.CSSProperties}>
                  <Icon size={22} />
                </div>
                <div className="links-card-body">
                  <strong className="links-card-label">{link.label}</strong>
                  <span className="links-card-handle">{link.handle}</span>
                  <p className="links-card-desc">{link.description}</p>
                </div>
                <span className="links-card-arrow"><ArrowUpRight size={17} /></span>
              </a></Reveal>
            );
          })}
        </div>
      </div>
    </section>
  </>;
}
