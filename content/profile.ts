export const profile = {
  name: 'Abdul Wahid', role: 'AI/ML Developer', headline: 'I build machine-learning systems that are easier to inspect, evaluate, and use.',
  location: 'Attock, Punjab, Pakistan', education: 'BS Artificial Intelligence · COMSATS University Islamabad, Attock Campus',
  semester: '5th semester', cgpa: '3.46 / 4.00', expectedGraduation: '2028',
  email: 'contact@abdulwahid.me', secondaryEmail: 'abdulwahid.connects@gmail.com',
  github: 'https://github.com/abduIwahid', linkedin: 'https://www.linkedin.com/in/abdu1wahid', kaggle: 'https://www.kaggle.com/', leetcode: 'https://leetcode.com/u/abdu1wahid/',
  cvSource: 'https://abdul-wahid-portfolio.vercel.app/CV.pdf', domain: 'https://abdulwahid.me',
  summary: 'Artificial Intelligence undergraduate focused on practical machine learning, model evaluation, explainability, and building useful software around data. I enjoy the part where an experiment becomes a system someone else can inspect and use.',
  focus: ['Machine learning & evaluation', 'Data science workflows', 'Explainable AI', 'Software for AI products'],
  educationHistory: [
    { title: 'BS Artificial Intelligence', organization: 'COMSATS University Islamabad · Attock Campus', period: 'Aug 2024 – 2028', detail: 'CGPA 3.46 / 4.00 · Current semester stated on public profile: 5th' },
    { title: 'Intermediate in Computer Science (ICS)', organization: 'Fazaia Degree College ARF Kamra', period: '2022 – 2024', detail: '827 / 1100 (75.2%)' }
  ],
  experience: [{ title: 'Machine Learning Intern', organization: 'Ezitech Institute (Eziline Software House)', location: 'Islamabad, Pakistan', period: 'Jul – Sep 2026', details: ['Worked on the MediSight AI project across model benchmarking, explainability, and ML operations workflows.', 'Used LightGBM, scikit-learn, SHAP, MLflow, and FastAPI within a broader web application.', 'The project documentation describes seven de-identified healthcare dataset domains and a LightGBM AUC–ROC result of 0.8307.'] }],
  credentials: [
    { title: 'Google AI Essentials Specialization', issuer: 'Google Career Certificates · Coursera', period: 'May 2026' },
    { title: 'AI & Machine Learning Developer', issuer: 'Programming Hub', period: 'Feb – Apr 2026' }
  ],
  activities: [
    { title: 'AI/ML Team Member', organization: 'Google Developer Groups on Campus · COMSATS Attock', period: '2026 – 2027' },
    { title: 'Participant', organization: 'Mind to Machine 2026 AI Hackathon · COMSATS Wah', period: 'May 2026' }
  ],
  skills: [
    { group: 'Languages', items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'] },
    { group: 'ML / Data', items: ['scikit-learn', 'LightGBM', 'SHAP', 'MLflow', 'Pandas', 'NumPy', 'Matplotlib'] },
    { group: 'AI Tools', items: ['FastAPI', 'Gemini API', 'GitHub API'] },
    { group: 'Web', items: ['Next.js', 'React', 'Flask', 'Node.js'] },
    { group: 'Databases', items: ['MySQL', 'Supabase'] },
    { group: 'DevOps', items: ['Docker', 'Vercel', 'Git'] },
  ]
} as const;
