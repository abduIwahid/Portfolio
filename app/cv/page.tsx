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

export default function CvPage() {
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
      <article className="cv-sheet">
        <header className="cv-top">
          <div>
            <h1>{profile.name}</h1>
            <p className="cv-role">AI / ML Developer · BS Artificial Intelligence Student</p>
            <p className="cv-role" style={{ fontSize: 11 }}>{profile.location}</p>
          </div>
          <div className="cv-contact">
            <a href={`mailto:${profile.email}`}>{profile.email}</a><br />
            <a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/abdu1wahid</a><br />
            <a href={profile.github} target="_blank" rel="noreferrer">github.com/abduIwahid</a><br />
            <a href="https://abdulwahid.me" target="_blank" rel="noreferrer">abdulwahid.me</a>
          </div>
        </header>

        <section className="cv-section">
          <h2>Profile</h2>
          <p>Artificial Intelligence undergraduate focused on practical machine learning, model evaluation, explainability, and building useful software around data. Hands-on experience includes healthcare-oriented ML workflows, classification, data analysis, and web applications that connect technical work to a usable interface.</p>
        </section>

        <section className="cv-section">
          <h2>Experience</h2>
          <div className="cv-item">
            <div className="cv-item-head">
              <strong>Machine Learning Intern · Ezitech Institute (Eziline Software House)</strong>
              <span>Jul – Sep 2026</span>
            </div>
            <p>Islamabad, Pakistan</p>
            <ul>
              <li>Worked on MediSight AI, an explainable healthcare risk-modelling workflow across seven de-identified dataset domains.</li>
              <li>Used LightGBM, scikit-learn, SHAP, MLflow, and FastAPI for model benchmarking, experiment tracking, and explanation workflows.</li>
              <li>Contributed to MLOps-oriented drift monitoring/retraining flows and a web application built with Next.js, TypeScript, and Supabase.</li>
              <li>Project notes report a LightGBM AUC–ROC of 0.8307; interpretation depends on the task-specific evaluation setup.</li>
            </ul>
          </div>
        </section>

        <section className="cv-section">
          <h2>Selected projects</h2>
          {projects.filter((p) => ['medisight-ai', 'customer-churn-prediction', 'predictly', 'nearsend', 'study-hub'].includes(p.slug)).map((project) => (
            <div className="cv-item" key={project.slug}>
              <div className="cv-item-head">
                <strong>{project.name}</strong>
                <span>{project.category}</span>
              </div>
              <p>{project.summary}</p>
              <p>
                {project.repo ? <a href={project.repo} target="_blank" rel="noreferrer">Source repository <ArrowUpRight size={10} style={{ verticalAlign: 'middle' }} /></a> : <span>Source repository link not confirmed</span>}
                {project.demo ? <> · <a href={project.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={10} style={{ verticalAlign: 'middle' }} /></a></> : null}
              </p>
            </div>
          ))}
        </section>

        <section className="cv-section">
          <h2>Education</h2>
          <div className="cv-item">
            <div className="cv-item-head">
              <strong>BS Artificial Intelligence · COMSATS University Islamabad, Attock Campus</strong>
              <span>Aug 2024 – 2028</span>
            </div>
            <p>CGPA: 3.46 / 4.00</p>
          </div>
          <div className="cv-item">
            <div className="cv-item-head">
              <strong>Intermediate in Computer Science · Fazaia Degree College ARF Kamra</strong>
              <span>2022 – 2024</span>
            </div>
            <p>827 / 1100 (75.2%)</p>
          </div>
        </section>

        <section className="cv-section">
          <h2>Technical skills</h2>
          <p><strong>Languages:</strong> Python, Java, C++, JavaScript, HTML, CSS</p>
          <p><strong>ML &amp; data:</strong> scikit-learn, NumPy, Pandas, Matplotlib, LightGBM, SHAP, MLflow</p>
          <p><strong>Web &amp; APIs:</strong> FastAPI, Flask, Next.js, React, Node.js, REST APIs</p>
          <p><strong>Data &amp; tools:</strong> MySQL, PostgreSQL, Supabase, Git, GitHub, Vercel, Docker</p>
          <p><strong>Core concepts:</strong> classification, model evaluation, explainability, data structures, OOP, database design</p>
        </section>

        <section className="cv-section">
          <h2>Certificates &amp; activities</h2>
          <p>Google AI Essentials Specialization — Google Career Certificates / Coursera (May 2026)</p>
          <p>AI &amp; Machine Learning Developer — Programming Hub (Feb–Apr 2026)</p>
          <p>AI/ML Team Member — GDG on Campus, COMSATS Attock (2026–2027)</p>
          <p>Participant — Mind to Machine 2026 AI Hackathon, COMSATS Wah (May 2026)</p>
        </section>
      </article>
      <p className="cv-footnote">
        This CV view mirrors the PDF version. For formal applications, use the PDF. <Link href="/contact">Contact me <ArrowUpRight size={12} style={{ verticalAlign: 'middle' }} /></Link>
      </p>
    </div>
  </>;
}
