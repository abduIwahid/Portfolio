import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Download, ExternalLink, Github } from 'lucide-react';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { Reveal } from '@/components/reveal';

export const metadata: Metadata = {
  title: 'CV',
  description: 'Curriculum vitae of Abdul Wahid, AI/ML Developer.',
  alternates: { canonical: '/cv' },
};

const CV_PROJECT_SLUGS = ['medisight-ai', 'customer-churn-prediction', 'predictly', 'nearsend', 'study-hub'];

const SKILL_GROUPS: { title: string; items: string }[] = [
  { title: 'Languages', items: 'Python, Java, C++, JavaScript, TypeScript, HTML, CSS' },
  { title: 'ML & Data', items: 'scikit-learn, LightGBM, XGBoost, NumPy, Pandas, Matplotlib, SHAP, MLflow' },
  { title: 'Web & APIs', items: 'FastAPI, Flask, Next.js, React, Node.js, REST APIs' },
  { title: 'Data & Tools', items: 'MySQL, PostgreSQL, Supabase, Git, GitHub, Vercel, Docker' },
  { title: 'Core Concepts', items: 'Classification, model evaluation, explainability (XAI), LLM integration (Gemini API), data structures, OOP, database design' },
];

const CERTIFICATIONS: { title: string; org: string; date: string; verify?: string }[] = [
  { title: 'Google AI Essentials', org: 'Google Career Certificates · Coursera', date: 'May 2026', verify: 'https://www.coursera.org/account/accomplishments/specialization/ET3L35MRSLBI' },
  { title: 'AI & Machine Learning Developer', org: 'Programming Hub', date: 'Feb – Apr 2026', verify: 'https://www.educative.io/verify-certificate/1SX3S0S4GG' },
  { title: 'ML with NumPy & Pandas', org: 'Educative', date: 'May 2026' },
];

const ACTIVITIES: { title: string; org: string; date: string; proof?: string }[] = [
  { title: 'Participant: DeepBuild Hackathon', org: 'SoftTech · COMSATS Attock', date: 'Oct 2026' },
  { title: 'AI/ML Team Member', org: 'GDG on Campus · COMSATS Attock', date: '2026 – 2027' },
  { title: 'Hackathon Participant', org: 'Mind to Machine 2026 AI Hackathon · COMSATS Wah', date: 'May 2026', proof: 'https://drive.google.com/file/d/1UGs2P9JgDlXth--FgMtQXr_n10pAjnsu/view?usp=sharing' },
];

export default function CvPage() {
  const cvProjects = projects.filter((p) => CV_PROJECT_SLUGS.includes(p.slug));
  return <>
    <section className="page-hero">
      <div className="container page-heading">
        <p className="eyebrow">Curriculum vitae</p>
        <h1>Experience, skills,<br />and selected work.</h1>
        <p>A readable version of my current profile. The PDF is the authoritative version. Use it for formal applications.</p>
      </div>
    </section>
    <div className="container">
      <div className="cv-actions">
        <a
          className="button button-primary"
          href="/CV.pdf"
          download
          id="download-cv-btn"
        >
          <Download size={16} /> Download CV
        </a>
      </div>

      <Reveal className="reveal-auto"><article className="cv-sheet cv2">
        <header className="cv2-head">
          <h2 className="cv2-name">{profile.name}</h2>
          <p className="cv2-role">AI / ML Developer, Explainable AI, MLOps</p>
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
          BS Artificial Intelligence undergraduate (CGPA 3.46/4.00) and Machine Learning Intern at Ezitech
          Institute, where I trained and benchmarked XGBoost and LightGBM models on healthcare datasets
          (best: LightGBM, 0.83 AUC-ROC across seven healthcare datasets), with MLflow experiment tracking and SHAP-based explanations
          served through FastAPI. I build and deploy full-stack ML products end to end, including WhyRisk,
          a live explainable healthcare risk platform, and Study Hub, a resource platform used by my entire
          BS AI class cohort. Focus areas: explainable AI (XAI), MLOps, and production ML workflows.
        </p>

        <div className="cv2-grid">
          <div className="cv2-main">
            <section className="cv2-sec">
              <h2>Experience</h2>
              <div className="cv2-item">
                <div className="cv2-item-head">
                  <strong>Machine Learning Intern (Remote)</strong>
                  <span>Jul – Sep 2026</span>
                </div>
                <p className="cv2-org">Ezitech Institute (Eziline Software House) · Islamabad, Pakistan</p>
                <ul>
                  <li>Built WhyRisk (formerly MediSight AI) during this internship, an explainable healthcare risk-modelling workflow across seven de-identified dataset domains.</li>
                  <li>Used LightGBM, scikit-learn, SHAP, MLflow, and FastAPI for model benchmarking, experiment tracking, and explanation workflows.</li>
                  <li>Contributed to MLOps-oriented drift monitoring/retraining flows and a web application built with Next.js, TypeScript, and Supabase.</li>
                  <li>Trained and benchmarked XGBoost, LightGBM, and scikit-learn classifiers; the best model (LightGBM) reached 0.83 AUC-ROC (best across seven healthcare datasets).</li>
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
                  <div className="cv2-item-head cv2-item-head-actions">
                    <strong>{project.name}</strong>
                    <span className="cv2-item-actions">
                      {project.repo ? <a href={project.repo} target="_blank" rel="noreferrer" className="project-github-btn" aria-label={`GitHub repo for ${project.name}`}><Github size={15} /></a> : null}
                      {project.demo ? <a href={project.demo} target="_blank" rel="noreferrer" className="project-github-btn" aria-label={`Live demo of ${project.name}`}><ExternalLink size={15} /></a> : null}
                    </span>
                  </div>
                  <p>{project.summary}</p>
                  <p className="cv2-stack">{project.stack.slice(0, 5).join(' · ')}</p>
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
                  <div className="cv2-cert-main">
                    <strong>{cert.title}</strong>
                    <span>{cert.org}</span>
                    {cert.verify && <><br /><a className="cv2-verify" href={cert.verify} target="_blank" rel="noopener noreferrer">Verify certificate <ArrowUpRight size={12} /></a></>}
                  </div>
                  <span className="cv2-cert-date">{cert.date}</span>
                </div>
              ))}
            </section>

            <section className="cv2-sec">
              <h2>Activities</h2>
              {ACTIVITIES.map((act) => (
                <div className="cv2-cert" key={act.title}>
                  <div className="cv2-cert-main">
                    <strong>{act.title}</strong>
                    <span>{act.org}</span>
                    {act.proof && <><br /><a className="cv2-verify" href={act.proof} target="_blank" rel="noopener noreferrer">Participation certificate <ArrowUpRight size={12} /></a></>}
                  </div>
                  <span className="cv2-cert-date">{act.date}</span>
                </div>
              ))}
            </section>
          </aside>
        </div>
      </article></Reveal>

      <p className="cv-footnote">
        This CV view mirrors the PDF version. For formal applications, use the PDF. <Link href="/contact">Contact me <ArrowUpRight size={12} style={{ verticalAlign: 'middle' }} /></Link>
      </p>
    </div>
  </>;
}
