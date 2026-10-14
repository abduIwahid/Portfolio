'use client';
import { useMemo, useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';

type Counts = { tp: number; fp: number; fn: number; tn: number };
const initial: Counts = { tp: 72, fp: 28, fn: 18, tn: 882 };
function percent(value: number): string { return `${(value * 100).toFixed(1)}%`; }
export function MetricPlayground() {
  const [counts, setCounts] = useState<Counts>(initial);
  const metrics = useMemo(() => {
    const total = counts.tp + counts.fp + counts.fn + counts.tn;
    const precision = counts.tp + counts.fp ? counts.tp / (counts.tp + counts.fp) : 0;
    const recall = counts.tp + counts.fn ? counts.tp / (counts.tp + counts.fn) : 0;
    return { accuracy: total ? (counts.tp + counts.tn) / total : 0, precision, recall, f1: precision + recall ? (2 * precision * recall) / (precision + recall) : 0 };
  }, [counts]);
  function update(key: keyof Counts, raw: string) { const value = raw === '' ? 0 : Number(raw); setCounts((current) => ({ ...current, [key]: Number.isFinite(value) ? Math.max(0, Math.min(1_000_000, Math.floor(value))) : 0 })); }
  const fields: { key: keyof Counts; label: string; description: string }[] = [
    { key: 'tp', label: 'True positives', description: 'Positive cases correctly identified' },
    { key: 'fp', label: 'False positives', description: 'Negative cases incorrectly flagged' },
    { key: 'fn', label: 'False negatives', description: 'Positive cases missed by the model' },
    { key: 'tn', label: 'True negatives', description: 'Negative cases correctly identified' }
  ];
  return <section className="metric-playground" aria-labelledby="metric-playground-title"><div className="metric-playground-heading"><span className="metric-icon"><Calculator size={18} /></span><div><p className="eyebrow">Interactive explainer</p><h2 id="metric-playground-title">See how one confusion matrix changes the story.</h2></div></div><p className="metric-intro">Edit the counts below. This is a synthetic teaching example, not a result from any portfolio project.</p><div className="metric-playground-grid"><div className="metric-inputs">{fields.map((field) => <label className="metric-input" key={field.key}><span>{field.label}<small>{field.description}</small></span><input type="number" min="0" max="1000000" step="1" inputMode="numeric" value={counts[field.key]} onChange={(event) => update(field.key, event.target.value)} /></label>)}<button type="button" className="metric-reset" onClick={() => setCounts(initial)}><RotateCcw size={14} /> Reset example</button></div><div className="metric-results" aria-live="polite"><div className="metric-result primary"><span>Accuracy</span><strong>{percent(metrics.accuracy)}</strong><small>Correct predictions / all predictions</small></div><div className="metric-result"><span>Precision</span><strong>{percent(metrics.precision)}</strong><small>How many positive predictions were correct</small></div><div className="metric-result"><span>Recall</span><strong>{percent(metrics.recall)}</strong><small>How many actual positives were found</small></div><div className="metric-result"><span>F1 score</span><strong>{percent(metrics.f1)}</strong><small>Harmonic mean of precision and recall</small></div></div></div><p className="metric-footnote">If the positive class is rare, a model can look strong on accuracy while missing a meaningful share of positive cases. Choose metrics based on the decision and error costs.</p></section>;
}
