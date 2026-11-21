'use client';

import { useState, type FormEvent } from 'react';

export function Reports({ today }: { today: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function download(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const start = String(values.get('start'));
    const end = String(values.get('end'));
    const hours = (event.nativeEvent as SubmitEvent).submitter?.getAttribute('value') === 'hours';
    const query = new URLSearchParams({ start, end });
    setBusy(true);
    setError('');
    try {
      const route = hours ? '/api/hours?action=export&team=true' : '/api/portal?action=report';
      const response = await fetch(route + '&' + query);
      if (!response.ok) {
        const problem = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(problem?.error || 'Unable to download this report.');
      }
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement('a');
      link.href = url;
      link.download = `hmf-${hours ? 'hours' : 'attendance'}-${start}-to-${end}.csv`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (problem) {
      setError((problem as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section>
      <div className="page-heading">
        <h1>Reports</h1>
      </div>
      <form className="leave-form" onSubmit={download} aria-busy={busy}>
        <div className="form-grid">
          <label>
            Start date
            <input type="date" name="start" defaultValue={today.slice(0, 7) + '-01'} required />
          </label>
          <label>
            End date
            <input type="date" name="end" defaultValue={today} required />
          </label>
        </div>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <div className="leave-actions">
          <button className="primary" value="attendance" disabled={busy}>
            Download attendance CSV
          </button>
          <button className="secondary" value="hours" disabled={busy}>
            Download hours CSV
          </button>
        </div>
        <p className="muted">
          <small>
            Choose up to 62 days. The attendance report includes submitted records and omits private
            notes.
          </small>
        </p>
      </form>
    </section>
  );
}
