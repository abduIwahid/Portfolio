import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'CV',
  description: 'Curriculum vitae of Abdul Wahid — AI/ML Developer.',
  alternates: { canonical: '/cv' },
};

const CV_PROJECT_SLUGS = ['medisight-ai', 'customer-churn-prediction', 'predictly', 'nearsend', 'study-hub'];

const SKILL_GROUPS: { title: string; items: string }[] = [
  { title: 'Languages', items: 'Python, Java, C++, JavaScript, HTML, CSS' },
  { title: 'ML & Data', items: 'scikit-learn, LightGBM, XGBoost, NumPy, Pandas, Matplotlib, SHAP, MLflow' },
  { title: 'Web & APIs', items: 'FastAPI, Flask, Next.js, React, Node.js, REST APIs' },
  { title: 'Data & Tools', items: 'MySQL, PostgreSQL, Supabase, Git, GitHub, Vercel, Docker' },
  { title: 'Core Concepts', items: 'Classification, model evaluation, explainability (XAI), data structures, OOP, database design' },
];

const CERTIFICATIONS: { title: string; org: string }[] = [
  { title: 'Google AI Essentials Specialization', org: 'Google Career Certificates · Coursera, May 2026' },
  { title: 'AI & Machine Learning Developer', org: 'Programming Hub, Feb – Apr 2026' },
  { title: 'ML with NumPy & Pandas', org: 'Educative, May 2026' },
];

const ACTIVITIES: { title: string; org: string }[] = [
  { title: 'AI/ML Team Member', org: 'GDG on Campus · COMSATS Attock, 2026 – 2027' },
  { title: 'Hackathon Participant', org: 'Mind to Machine 2026 AI Hackathon · COMSATS Wah, May 2026' },
];

export default function CvPage() {
  const cvProjects = projects.filter((p) => CV_PROJECT_SLUGS.includes(p.slug));
  return <>
    <section className="page-hero">
      <div className="container page-heading">
        <p className="eyebrow">Curriculum vitae</p>
        <h1>Experience, skills,<br />and selected work.</h1>
        <p>A readable version of my current profile. The PDF is the authoritative version — use it for formal applications.</p>
      </div>
    </section>
    <div className="container">
      <div className="cv-actions">
        <a
          className="button button-primary"
          href="/CV.pdf"
          target="_blank"
          rel="noreferrer"
          id="view-cv-btn"
        >
          <ExternalLink size={16} /> View CV
        </a>
      </div>

      <article className="cv-sheet cv2">
        <header className="cv2-head">
          <h1 className="cv2-name">{profile.name}</h1>
          <p className="cv2-role">AI / ML Developer · Explainable AI · MLOps</p>
          <div className="cv2-contact-strip">
            <div>
              <span>Email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <div>
              <span>Location</span>
              <em>{profile.location}</em>
            </div>
            <div>
              <span>LinkedIn</span>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/abdu1wahid</a>
            </div>
            <div>
              <span>GitHub</span>
              <a href={profile.github} target="_blank" rel="noreferrer">github.com/abduIwahid</a>
            </div>
          </div>
        </header>

        <p className="cv2-summary">
          Artificial Intelligence undergraduate focused on practical machine learning, model evaluation,
          explainability, and building useful software around data. Hands-on experience includes
          healthcare-oriented ML workflows, classification, data analysis, and web applications that
          connect technical work to a usable interface.
        </p>

        <div className="cv2-grid">
          <div className="cv2-main">
            <section className="cv2-sec">
              <h2>Experience</h2>
              <div className="cv2-item">
                <div className="cv2-item-head">
                  <strong>Machine Learning Intern</strong>
                  <span>Jul – Sep 2026</span>
                </div>
                <p className="cv2-org">Ezitech Institute (Eziline Software House) · Islamabad, Pakistan</p>
                <ul>
                  <li>Worked on MediSight AI, an explainable healthcare risk-modelling workflow across seven de-identified dataset domains.</li>
                  <li>Used LightGBM, scikit-learn, SHAP, MLflow, and FastAPI for model benchmarking, experiment tracking, and explanation workflows.</li>
                  <li>Contributed to MLOps-oriented drift monitoring/retraining flows and a web application built with Next.js, TypeScript, and Supabase.</li>
                  <li>Project notes report a LightGBM AUC–ROC of 0.8307; interpretation depends on the task-specific evaluation setup.</li>
                </ul>
              </div>
            </section>

            <section className="cv2-sec">
              <h2>Education</h2>
              <div className="cv2-item">
                <div className="cv2-item-head">
                  <strong>BS Artificial Intelligence</strong>
                  <span>Aug 2024 – 2028</span>
                </div>
                <p className="cv2-org">COMSATS University Islamabad · Attock Campus</p>
                <p>CGPA: 3.46 / 4.00</p>
              </div>
              <div className="cv2-item">
                <div className="cv2-item-head">
                  <strong>Intermediate in Computer Science</strong>
                  <span>2022 – 2024</span>
                </div>
                <p className="cv2-org">Fazaia Degree College · ARF Kamra</p>
                <p>827 / 1100 (75.2%)</p>
              </div>
            </section>

            <section className="cv2-sec">
              <h2>Projects</h2>
              {cvProjects.map((project) => (
                <div className="cv2-item" key={project.slug}>
                  <div className="cv2-item-head">
                    <strong>{project.name}</strong>
                    <span>{project.category}</span>
                  </div>
                  <p>{project.summary}</p>
                  <p className="cv2-stack">{project.stack.slice(0, 5).join(' · ')}</p>
                  <p className="cv2-links">
                    {project.repo ? <a href={project.repo} target="_blank" rel="noreferrer">Source repository <ArrowUpRight size={10} style={{ verticalAlign: 'middle' }} /></a> : <span>Source repository link not confirmed</span>}
                    {project.demo ? <> · <a href={project.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={10} style={{ verticalAlign: 'middle' }} /></a></> : null}
                  </p>
                </div>
              ))}
            </section>
          </div>

          <aside className="cv2-side">
            <section className="cv2-sec">
              <h2>Skills</h2>
              {SKILL_GROUPS.map((group) => (
                <div className="cv2-skill-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <p>{group.items}</p>
                </div>
              ))}
            </section>

            <section className="cv2-sec">
              <h2>Certifications</h2>
              {CERTIFICATIONS.map((cert) => (
                <div className="cv2-cert" key={cert.title}>
                  <strong>{cert.title}</strong>
                  <span>{cert.org}</span>
                </div>
              ))}
            </section>

            <section className="cv2-sec">
              <h2>Activities</h2>
              {ACTIVITIES.map((act) => (
                <div className="cv2-cert" key={act.title}>
                  <strong>{act.title}</strong>
                  <span>{act.org}</span>
                </div>
              ))}
            </section>
          </aside>
        </div>
      </article>

      <p className="cv-footnote">
        This CV view mirrors the PDF version. For formal applications, use the PDF. <Link href="/contact">Contact me <ArrowUpRight size={12} style={{ verticalAlign: 'middle' }} /></Link>
      </p>
    </div>
  </>;
}
