import { projectSchema } from '@/lib/validation/content';

export type Project = {
  slug: string;
  name: string;
  category: 'Machine Learning' | 'Applied AI' | 'Web Engineering' | 'Database Systems';
  kind: string;
  summary: string;
  problem: string;
  role: string;
  status: string;
  featured: boolean;
  stack: string[];
  highlights: string[];
  approach: { title: string; body: string }[];
  evidence: { label: string; value: string; note: string; source?: string }[];
  limitations: string[];
  repo?: string;
  demo?: string;
  accent: 'orange' | 'ink' | 'paper';
};

export const projects: Project[] = [
  {
    slug: 'medisight-ai', name: 'MediSight AI', category: 'Machine Learning', kind: 'ML engineering · Internship',
    summary: 'An explainable healthcare risk-modelling workflow built around model evaluation, experiment tracking, and a clinician-facing interface.',
    problem: 'Healthcare prediction work is not only about producing a score. Models need reproducible experiments, understandable feature contributions, and clear boundaries around what a prediction can and cannot say.',
    role: 'Machine Learning Intern at Ezitech Institute (Eziline Software House); contribution described in the project repository and CV.', status: 'Internship project · Jul–Sep 2026', featured: true,
    stack: ['Python', 'LightGBM', 'scikit-learn', 'SHAP', 'MLflow', 'FastAPI', 'Next.js', 'TypeScript', 'Supabase', 'Docker'],
    highlights: ['Model training and benchmarking across seven de-identified healthcare dataset domains', 'SHAP-based explanation workflow exposed through a FastAPI service', 'Experiment tracking with MLflow and an interface for reviewing model behaviour', 'MLOps-oriented drift monitoring and retraining workflow documented in the project'],
    approach: [
      { title: 'Prepare and compare', body: 'The workflow organizes dataset-specific preprocessing and classifier benchmarking, rather than treating different clinical prediction tasks as one interchangeable problem.' },
      { title: 'Track experiments', body: 'MLflow provides a record of model runs so evaluation can be compared and revisited instead of relying on notebook state.' },
      { title: 'Expose explanations', body: 'SHAP is used to inspect feature contributions. Explanations describe model behaviour; they are not clinical reasoning or proof of causality.' },
      { title: 'Serve the workflow', body: 'A FastAPI service connects model operations to a Next.js interface, with Supabase used for application data and supporting functionality.' }
    ],
    evidence: [
      { label: 'Evaluation', value: '0.8307 AUC–ROC', note: 'LightGBM result stated in the CV/project notes; task-specific context should be checked before comparing with other models.' },
      { label: 'Datasets', value: '7 domains', note: 'De-identified healthcare dataset domains described in project documentation.' },
      { label: 'Reproducibility', value: 'MLflow', note: 'Experiment tracking is part of the documented stack.' }
    ],
    limitations: ['Results depend on the dataset, target definition, split strategy, and class balance; a single score should not be generalized across clinical use cases.', 'The system is a technical project, not a certified medical device or a substitute for professional judgement.', 'Dataset-level details and evaluation protocols should be reviewed in the repository before using results for research conclusions.'],
    repo: 'https://github.com/abduIwahid/MediSight-Healthcare-Platform', demo: 'https://medisight-healthcare.vercel.app', accent: 'orange'
  },
  {
    slug: 'customer-churn-prediction', name: 'Customer Churn Prediction', category: 'Machine Learning', kind: 'Classification · Coursework',
    summary: 'A supervised-learning study comparing classification approaches for identifying customers who may leave a service.',
    problem: 'Retention teams need useful risk signals, but classifying churn requires more than selecting a model with a high headline accuracy. Precision, recall, F1, class balance, and the decision threshold all matter.',
    role: 'Team coursework project; model experimentation and analysis are represented in the public repository.', status: 'Customer Churn Prediction', featured: true,
    stack: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'Matplotlib', 'Seaborn'],
    highlights: ['Data cleaning and exploratory analysis', 'Compared Logistic Regression, Random Forest, and an MLP classifier', 'Explored clustering as a complementary unsupervised view of customer groups', 'Selected Logistic Regression for the reported baseline result'],
    approach: [
      { title: 'Understand the data', body: 'Inspect feature types, missingness, distributions, and the churn label before fitting models.' },
      { title: 'Build baselines', body: 'Compare a linear model with tree-based and neural approaches to understand trade-offs in performance and interpretability.' },
      { title: 'Evaluate the right things', body: 'Report accuracy alongside F1 and other class-sensitive metrics so the model is not judged on a single number.' },
      { title: 'Keep the output actionable', body: 'The project is an educational prediction workflow; it does not claim to be a production retention platform.' }
    ],
    evidence: [
      { label: 'Accuracy', value: '84%', note: 'Owner-confirmed CV figure; verify exact split and evaluation setup in the repository before direct comparisons.' },
      { label: 'F1 score', value: '71%', note: 'Owner-confirmed CV figure; F1 depends on the positive class and decision threshold.' },
      { label: 'Selected baseline', value: 'Logistic Regression', note: 'Reported as the selected model in the CV.' }
    ],
    limitations: ['The reported values need to be interpreted in the context of the data split and class distribution.', 'A coursework result is not evidence of production performance or causal drivers of churn.', 'Clustering is exploratory and should not be interpreted as ground-truth customer segments without validation.'],
    repo: 'https://github.com/abduIwahid/Churnex', demo: 'https://churnex.vercel.app', accent: 'ink'
  },
  {
    slug: 'predictly', name: 'Predictly', category: 'Applied AI', kind: 'Property intelligence · Web app',
    summary: 'A real-estate valuation dashboard that combines market context with transparent, local image-quality signals.',
    problem: 'Property estimates are easy to present as precise even when inputs are incomplete. Predictly separates its estimate from image-derived signals and makes the supporting context visible.',
    role: 'Personal project; implementation and limitations are described in the public repository.', status: 'Real-Estate Valuation Web App', featured: true,
    stack: ['Python', 'Flask', 'Pillow', 'JavaScript', 'Leaflet'],
    highlights: ['Property estimates for Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, and Multan', 'Local image analysis for brightness, colour richness, contrast, and sharpness', 'PDF report, historical-trend views, map exploration, and mortgage estimate', 'Comparable listings and amenity adjustments are presented as contextual features, not independently verified market data'],
    approach: [
      { title: 'Capture the property context', body: 'The interface gathers location and property details to build a structured estimate request.' },
      { title: 'Inspect image quality', body: 'Pillow-based image processing calculates visual properties such as brightness and sharpness. These are image signals, not a learned property-valuation model.' },
      { title: 'Present a range of context', body: 'Maps, trend views, and a report help users inspect the estimate and its assumptions in one place.' }
    ],
    evidence: [
      { label: 'Image analysis', value: 'Local processing', note: 'Pillow-based image features; no external vision API is required for this analysis.' },
      { label: 'Coverage', value: '6 cities', note: 'Cities listed in the project README.' },
      { label: 'Report', value: 'PDF export', note: 'The app includes a property report workflow.' }
    ],
    limitations: ['The visual features are not a trained computer-vision valuation model.', 'Comparable listings and market context may be illustrative or mocked; the estimate should not be treated as a certified appraisal.', 'Property prices change over time and require verified, current market data for real decisions.'],
    repo: 'https://github.com/abduIwahid/Predictly', demo: 'https://predict-home.vercel.app', accent: 'paper'
  },
  {
    slug: 'nearsend', name: 'NearSend', category: 'Web Engineering', kind: 'Browser-to-browser file transfer',
    summary: 'Private nearby file sharing designed to move files between devices without accounts, cloud uploads, or share links.',
    problem: 'Moving a file from a phone to a laptop often involves sending it through an inbox or uploading it to a third-party service. NearSend explores a direct browser-to-browser path.',
    role: 'Personal project; public repository and live application.', status: 'File-Sharing Web Application', featured: false,
    stack: ['JavaScript', 'WebRTC', 'WebSocket', 'Node.js', 'PWA', 'Vercel'],
    highlights: ['Device discovery and pairing for devices on a shared Wi-Fi network or hotspot', 'WebRTC data channels for direct transfer after signalling', 'QR-based pairing and multi-file transfer interface', 'Signalling service coordinates peers; file transfer is designed to happen peer-to-peer'],
    approach: [
      { title: 'Discover and pair', body: 'The signalling layer helps devices find a room and exchange connection details. A QR code can make pairing more convenient.' },
      { title: 'Establish a peer connection', body: 'WebRTC negotiates a data channel between browsers where network conditions permit it.' },
      { title: 'Transfer chunks', body: 'File bytes move through the peer connection rather than being uploaded to a portfolio-owned file store.' }
    ],
    evidence: [
      { label: 'Account', value: 'Not required', note: 'No user account is part of the current flow.' },
      { label: 'Transfer path', value: 'WebRTC', note: 'Peer-to-peer after signalling; network topology can affect connectivity.' },
      { label: 'Server role', value: 'Signalling', note: 'The server helps establish the connection rather than storing file contents.' }
    ],
    limitations: ['Direct connectivity depends on browser support, firewall/NAT behaviour, and network conditions; some environments may need additional connectivity infrastructure.', 'Do not send sensitive files over an untrusted device or network without independently evaluating the security model.', 'The application should be tested on the actual device/browser pair before relying on it for a critical transfer.'],
    repo: 'https://github.com/abduIwahid/NearSend', demo: 'https://share-any-file.vercel.app', accent: 'orange'
  },
  {
    slug: 'smart-doctor-connect', name: 'Smart Doctor Connect', category: 'Applied AI', kind: 'Hackathon · Healthcare',
    summary: 'A healthcare-assistance concept developed for the Mind to Machine 2026 AI hackathon.',
    problem: 'Healthcare information and service discovery can be fragmented. The project explores a more accessible digital entry point for people seeking assistance.',
    role: 'Hackathon participant project; implementation details and team contribution should be read from the repository.', status: 'Hackathon project', featured: false,
    stack: ['Web development', 'AI-assisted workflows'],
    highlights: ['Built as part of the Mind to Machine 2026 event at COMSATS Wah', 'Healthcare-oriented user flow and service concept', 'Public repository and live demo available for review'],
    approach: [{ title: 'Prototype the workflow', body: 'The project was developed in a hackathon setting, prioritizing a demonstrable user journey and working prototype.' }],
    evidence: [{ label: 'Context', value: 'MTM 2026', note: 'Mind to Machine AI Hackathon, May 2026.' }],
    limitations: ['A hackathon prototype is not a clinically validated healthcare product.', 'Specific model, data, and safety claims should only be made after reviewing the implementation and event deliverables.'],
    repo: 'https://github.com/abduIwahid/Smart-Doctor-Connect', demo: 'https://smartdoctor-ai.vercel.app', accent: 'ink'
  },
  {
    slug: 'freelance-marketplace-database', name: 'Freelance Marketplace Database', category: 'Database Systems', kind: 'Relational database · Coursework',
    summary: 'A relational database design for a freelance marketplace, with normalized entities and SQL-side business logic.',
    problem: 'A marketplace has connected workflows for accounts, skills, projects, bids, and payments. The schema needs to represent these relationships while limiting duplication and preserving integrity.',
    role: 'Academic database project; source files document schema and SQL features.', status: 'Semester Project', featured: false,
    stack: ['MySQL', 'SQL', 'ERD', 'Normalization', 'Views', 'Triggers', 'Stored procedures'],
    highlights: ['Marketplace entities for users, freelancers, clients, projects, bids, and payments', 'Schema design and normalization work', 'SQL views and procedural database features documented in the repository'],
    approach: [{ title: 'Model relationships', body: 'Separate entity responsibilities and represent relationships explicitly, including skills and project participation.' }, { title: 'Enforce integrity', body: 'Use keys and constraints to keep records consistent, and SQL-side features to package recurring operations.' }],
    evidence: [{ label: 'Core', value: 'Relational schema', note: 'MySQL project repository.' }],
    limitations: ['This is a database coursework project rather than a deployed commercial marketplace.', 'Operational security, payment compliance, and production scale are outside the demonstrated scope.'],
    repo: 'https://github.com/abduIwahid/Freelance-MarketPlace-Management-System', accent: 'paper'
  },
  {
    slug: 'inventory-management-system', name: 'Inventory Management System', category: 'Web Engineering', kind: 'Java · Desktop application',
    summary: 'A Java Swing inventory-management interface for products, stock, sales, and suppliers.',
    problem: 'Small inventory workflows need a clear way to review items and update stock-related records without navigating raw data files.',
    role: 'Academic Java project; repository contains the application source.', status: 'Semester Project', featured: false,
    stack: ['Java', 'Swing', 'NetBeans', 'File persistence', 'MySQL schema'],
    highlights: ['Desktop GUI for inventory-oriented workflows', 'Object-oriented Java class structure', 'Text-file persistence in the application, with a separate MySQL script for database practice'],
    approach: [{ title: 'Build the user flow', body: 'Swing forms expose the core inventory operations through a desktop interface.' }, { title: 'Persist the records', body: 'The current application uses text-file persistence; the separate SQL script is not presented as an integrated database backend.' }],
    evidence: [{ label: 'Interface', value: 'Java Swing', note: 'Desktop GUI project.' }],
    limitations: ['The MySQL script is separate and should not be assumed to be connected to the desktop application.', 'Production concerns such as multi-user concurrency, authorization, backups, and audit logs are not claimed.'],
    repo: 'https://github.com/abduIwahid/Inventory-Management-System', accent: 'ink'
  },
  {
    slug: 'study-hub', name: 'Study Hub', category: 'Web Engineering', kind: 'FA24-BAI',
    summary: 'A course-resource web app for organizing lecture notes, PDFs, CDFs, and lab manuals with search and study helpers.',
    problem: 'Course materials can be scattered across multiple sources. Study Hub provides a single searchable place for students to find and revisit resources.',
    role: 'Personal/academic project; included in the owner-provided CV.', status: 'All Course Materials are Available', featured: true,
    stack: ['JavaScript', 'PWA', 'GitHub API', 'Gemini API'],
    highlights: ['Resources organized across four courses', 'Search, type filters, favorites, and recently viewed items', 'PWA support and password-protected admin workflow', 'Optional AI-generated study summaries, quizzes, and viva questions'],
    approach: [{ title: 'Organize course content', body: 'A searchable resource catalogue gives course material consistent metadata and a simpler discovery flow.' }, { title: 'Support revision', body: 'Study helpers can turn selected material into summaries and practice prompts; generated content should be checked against the source material.' }],
    evidence: [{ label: 'Coverage', value: '4 courses', note: 'CV description of the current resource hub.' }],
    limitations: ['AI-generated summaries or questions may contain errors and require review.', 'Resource availability depends on the configured content source and repository access.', 'Do not expose administrative credentials or private course materials in a public deployment.'],
    repo: 'https://github.com/abduIwahid/fa24-bai', demo: 'https://fa24-bai.vercel.app', accent: 'paper'
  }
];

projectSchema.array().parse(projects);

export const featuredProjects = projects.filter((project) => project.featured);
export function getProject(slug: string): Project | undefined { return projects.find((project) => project.slug === slug); }
