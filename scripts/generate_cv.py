"""Generate the portfolio's print-friendly CV PDF from reviewed content."""
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether, PageBreak
from xml.sax.saxutils import escape

PATH = 'public/cv/abdul-wahid-cv.pdf'
INK = colors.HexColor('#171717')
MUTED = colors.HexColor('#555555')
LINE = colors.HexColor('#dedede')
doc = SimpleDocTemplate(PATH, pagesize=A4, rightMargin=17*mm, leftMargin=17*mm, topMargin=15*mm, bottomMargin=15*mm, title='Abdul Wahid — AI/ML Developer CV', author='Abdul Wahid')
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='NameAW', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=25, leading=27, textColor=INK, alignment=0, spaceAfter=3))
styles.add(ParagraphStyle(name='RoleAW', parent=styles['Normal'], fontName='Helvetica', fontSize=10, leading=14, textColor=MUTED, spaceAfter=4))
styles.add(ParagraphStyle(name='ContactAW', parent=styles['Normal'], fontName='Helvetica', fontSize=7.3, leading=11, textColor=MUTED, alignment=TA_RIGHT))
styles.add(ParagraphStyle(name='SectionAW', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=9, leading=12, textColor=INK, spaceBefore=12, spaceAfter=5))
styles.add(ParagraphStyle(name='BodyAW', parent=styles['BodyText'], fontName='Helvetica', fontSize=8.3, leading=12, textColor=MUTED, spaceAfter=4))
styles.add(ParagraphStyle(name='ItemAW', parent=styles['BodyText'], fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=INK, spaceAfter=1))
styles.add(ParagraphStyle(name='DateAW', parent=styles['Normal'], fontName='Helvetica', fontSize=7.5, leading=10, textColor=MUTED, alignment=TA_RIGHT))
styles.add(ParagraphStyle(name='BulletAW', parent=styles['BodyText'], fontName='Helvetica', fontSize=8, leading=11, textColor=MUTED, leftIndent=10, firstLineIndent=-6, bulletIndent=0, spaceAfter=2))
story = []
header = Table([
    [Paragraph('Abdul Wahid', styles['NameAW']), Paragraph('contact@abdulwahid.me<br/>abdulwahid.connects@gmail.com<br/>linkedin.com/in/abdu1wahid<br/>github.com/abduIwahid<br/>abdulwahid.me', styles['ContactAW'])],
    [Paragraph('AI / ML Developer · BS Artificial Intelligence Student<br/>Attock, Punjab, Pakistan', styles['RoleAW']), '']
], colWidths=[105*mm, 70*mm])
header.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('ALIGN',(1,0),(1,0),'RIGHT'),('SPAN',(0,1),(1,1)),('LINEBELOW',(0,1),(-1,1),1.6,INK),('BOTTOMPADDING',(0,1),(-1,1),8),('TOPPADDING',(0,0),(-1,-1),0),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0)]))
story += [header, Spacer(1,4)]

def section(title, body):
    story.append(Paragraph(title.upper(), styles['SectionAW']))
    story.append(HRFlowable(width='100%', thickness=.5, color=LINE, spaceAfter=5))
    if isinstance(body, str): story.append(Paragraph(body, styles['BodyAW']))
    else: story.extend(body)

def item(title, date, subtitle, bullets):
    table = Table([[Paragraph(escape(title), styles['ItemAW']), Paragraph(escape(date), styles['DateAW'])], [Paragraph(escape(subtitle), styles['BodyAW']), '']], colWidths=[125*mm,50*mm])
    table.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('SPAN',(0,1),(1,1)),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0),('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),0)]))
    result = [table]
    for bullet in bullets: result.append(Paragraph('• ' + escape(bullet), styles['BulletAW']))
    result.append(Spacer(1,4))
    return KeepTogether(result)

section('Profile', 'Artificial Intelligence undergraduate focused on practical machine learning, model evaluation, explainability, and building useful software around data. Interested in turning experiments into systems that can be inspected, evaluated, and used.')
section('Experience', [item('Machine Learning Intern · Ezitech Institute (Eziline Software House)', 'Jul – Sep 2026', 'Islamabad, Pakistan', [
    'Worked on MediSight AI, an explainable healthcare risk-modelling workflow across seven de-identified dataset domains.',
    'Used LightGBM, scikit-learn, SHAP, MLflow, and FastAPI for model benchmarking, experiment tracking, and explanation workflows.',
    'Contributed to MLOps-oriented drift monitoring/retraining flows and a web application built with Next.js, TypeScript, and Supabase.',
    'Project notes report a LightGBM AUC–ROC of 0.8307; interpretation depends on task-specific evaluation context.'
])])
section('Selected projects', [
    item('MediSight AI', 'ML engineering', 'Healthcare model evaluation and explainability', ['SHAP explanation workflow, MLflow experiment tracking, FastAPI model service, and a Next.js/Supabase application.', 'Repository: github.com/abduIwahid/Ezitech-Internship · Demo: ezitech-internship.vercel.app']),
    item('Customer Churn Prediction', 'Machine learning', 'Supervised classification coursework', ['Compared Logistic Regression, Random Forest, and MLP approaches; Logistic Regression selected as the reported baseline.', 'CV-reported result: 84% accuracy and 71% F1; confirm evaluation split and target context before comparison.', 'Repository: github.com/abduIwahid/Customer-Churn-Prediction']),
    item('Predictly', 'Applied AI', 'Real-estate estimate dashboard', ['Flask application with local Pillow-based image-quality features, map views, report export, and mortgage estimates.', 'Image processing is not presented as a trained valuation model; some comparable/market context may be illustrative.', 'Repository: github.com/abduIwahid/Predictly · Demo: predict-home.vercel.app']),
    item('NearSend', 'Web engineering', 'Browser-to-browser file transfer', ['WebRTC peer-to-peer transfer flow with WebSocket signalling, device pairing, and a PWA interface.', 'Repository: github.com/abduIwahid/NearSend · Demo: share-any-file.vercel.app'])
])
section('Education', [
    item('BS Artificial Intelligence · COMSATS University Islamabad, Attock Campus', 'Aug 2024 – 2028', 'CGPA: 3.46 / 4.00', []),
    item('Intermediate in Computer Science · Fazaia Degree College ARF Kamra', '2022 – 2024', '827 / 1100 (75.2%)', [])
])
story.append(PageBreak())
section('Additional projects', [
    item('Study Hub', 'Academic project', 'Course-resource hub and PWA', ['Search, type filters, favorites, recently viewed resources, and AI-assisted study summaries/quizzes; generated study content should be checked against source material.']),
    item('Smart Doctor Connect', 'MTM 2026', 'Healthcare-oriented hackathon prototype', ['Built for the Mind to Machine 2026 AI hackathon; a prototype, not a clinically validated healthcare product.']),
    item('Freelance Marketplace Database', 'Database systems', 'Relational schema and SQL business logic', ['MySQL schema for users, freelancers, clients, projects, bids, and payments with normalization and SQL-side features.']),
    item('Inventory Management System', 'Java', 'Desktop inventory workflow', ['Java Swing application with text-file persistence; a separate MySQL script is not claimed to be integrated.'])
])
section('Technical skills', '<b>Languages:</b> Python, Java, C++, JavaScript, HTML, CSS<br/><b>ML & data:</b> scikit-learn, NumPy, Pandas, Matplotlib, LightGBM, SHAP, MLflow<br/><b>Web & APIs:</b> FastAPI, Flask, Next.js, React, Node.js, REST APIs<br/><b>Data & tools:</b> MySQL, PostgreSQL, Supabase, Git, GitHub, Vercel, Docker<br/><b>Core concepts:</b> classification, model evaluation, explainability, data structures, OOP, database design')
section('Certificates & activities', '<b>Google AI Essentials Specialization</b> — Google Career Certificates / Coursera (May 2026)<br/><b>AI & Machine Learning Developer</b> — Programming Hub (Feb–Apr 2026)<br/><b>AI/ML Team Member</b> — GDG on Campus, COMSATS Attock (2026–2027)<br/><b>Participant</b> — Mind to Machine 2026 AI Hackathon, COMSATS Wah (May 2026)')

def footer(canvas, doc):
    canvas.saveState(); canvas.setStrokeColor(LINE); canvas.setLineWidth(.5); canvas.line(17*mm,11*mm,A4[0]-17*mm,11*mm); canvas.setFont('Helvetica',7); canvas.setFillColor(MUTED); canvas.drawString(17*mm,7*mm,'Abdul Wahid · AI/ML Developer'); canvas.drawRightString(A4[0]-17*mm,7*mm,f'Page {doc.page}'); canvas.restoreState()

doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(f'Generated {PATH}')
