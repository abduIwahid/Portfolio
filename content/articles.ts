import { articleSchema } from '@/lib/validation/content';

export type Article = { slug: string; title: string; deck: string; category: string; date: string; readTime: string; status: 'Published' | 'Draft'; projectSlugs: string[]; sections: { heading: string; paragraphs: string[]; bullets?: string[] }[]; references: { label: string; href: string }[] };
export const articles: Article[] = [
  {
    slug: 'accuracy-is-not-a-model-evaluation-plan', title: 'Accuracy is not a model evaluation plan',
    deck: 'A practical checklist for evaluating classifiers without hiding the trade-offs that matter.', category: 'Machine Learning', date: '2026-10-14', readTime: '6 min read', status: 'Published', projectSlugs: ['customer-churn-prediction', 'medisight-ai'],
    sections: [
      { heading: 'Start with the decision, not the score', paragraphs: ['A metric is useful only in relation to the decision a model will support. Before selecting a score, write down what a false positive and a false negative cost in the target setting. The same classifier can be acceptable for one workflow and harmful in another.', 'This is especially important when the classes are imbalanced. A model that predicts the majority class can achieve a high accuracy while failing to identify the cases the project was meant to find.'] },
      { heading: 'Use a small, complementary metric set', paragraphs: ['Accuracy is the share of predictions that are correct. Precision asks how many positive predictions were correct; recall asks how many actual positives were found. F1 combines precision and recall through their harmonic mean. These metrics answer different questions, so they should not be treated as interchangeable.'], bullets: ['Inspect the confusion matrix and identify the positive class.', 'Report precision, recall, and F1 alongside accuracy when positive-class errors matter.', 'State the split strategy and keep test data out of model selection.', 'Compare against a simple baseline before celebrating a more complex model.'] },
      { heading: 'Thresholds are part of the model behaviour', paragraphs: ['Many classifiers output scores that are converted into class labels using a threshold. Moving that threshold changes the balance between precision and recall. If a project reports only one metric at the default threshold, readers may miss a meaningful part of the decision process.', 'Threshold selection should happen on validation data and reflect the use case. A threshold chosen after repeatedly inspecting the test set can make the reported test result optimistic.'] },
      { heading: 'Make the evidence reproducible', paragraphs: ['A credible evaluation report should identify the dataset, target label, preprocessing, train/validation/test strategy, baseline, selected metric, and limitations. Where experiments are repeated, record configuration and results so comparisons do not depend on memory or notebook execution order.', 'For healthcare, finance, hiring, or other high-impact contexts, predictive performance alone is not evidence that a model is safe or appropriate to deploy. Data representativeness, calibration, subgroup behaviour, monitoring, and human oversight need separate consideration.'] },
      { heading: 'A compact review checklist', paragraphs: ['Before publishing a result, ask: does the metric match the decision; is the baseline credible; was the test set held out; are the positive class and threshold explicit; and are the limits of the data clear? If any answer is missing, the next step is not a bigger model. It is better evidence.'] }
    ],
    references: [
      { label: 'scikit-learn: Model evaluation', href: 'https://scikit-learn.org/stable/modules/model_evaluation.html' },
      { label: 'scikit-learn: Classification metrics', href: 'https://scikit-learn.org/stable/modules/generated/sklearn.metrics.classification_report.html' },
      { label: 'NIST AI Risk Management Framework', href: 'https://www.nist.gov/itl/ai-risk-management-framework' }
    ]
  },
  {
    slug: 'what-explainability-can-and-cannot-tell-you', title: 'What explainability can — and cannot — tell you',
    deck: 'Feature attribution is a lens on model behaviour, not a shortcut to causality or trust.', category: 'Explainable AI', date: '2026-10-14', readTime: '5 min read', status: 'Published', projectSlugs: ['medisight-ai'],
    sections: [
      { heading: 'An explanation answers a narrower question', paragraphs: ['Feature-attribution methods can help inspect which inputs contributed to a model output under a defined explanation method. That is valuable for debugging, model review, and communicating behaviour. It does not automatically explain the real-world process that generated the outcome.', 'A feature can be influential because it is correlated with a meaningful variable, because it proxies for a sensitive attribute, or because the training data contains a spurious pattern. Attribution alone cannot tell you which story is true.'] },
      { heading: 'Check the context around an attribution', paragraphs: ['Before interpreting an explanation, record the model version, background/reference data, target, preprocessing path, and whether the explanation is local or global. Different choices can change what a chart means.', 'Correlated features complicate interpretation because information can be shared across inputs. A ranked bar chart can look precise while concealing uncertainty or instability.'] },
      { heading: 'Treat explanation as one piece of evidence', paragraphs: ['Combine attribution with error analysis, subgroup checks, domain review, and tests for data leakage. If an explanation is used in a high-impact setting, validate whether intended users understand it and whether it improves the decision process.', 'For a healthcare-oriented prototype such as MediSight AI, SHAP helps inspect model behaviour. It does not establish clinical validity, prove causality, or replace a clinician. Those claims require evidence beyond an attribution plot.'] }
    ],
    references: [
      { label: 'SHAP documentation', href: 'https://shap.readthedocs.io/en/latest/' },
      { label: 'NIST AI Risk Management Framework', href: 'https://www.nist.gov/itl/ai-risk-management-framework' }
    ]
  }
];
articleSchema.array().parse(articles);

export function getArticle(slug: string): Article | undefined { return articles.find((article) => article.slug === slug); }
