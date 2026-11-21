'use client';
import { useState } from 'react';
import { blankProfile, roles, type Profile, type Role } from './lib/core';
import type { Person } from './lib/store';
import { workforce, useWorkforce, roleLabel } from './workforce-context';
import { Notice, Field } from './workforce-fields';
import { FocusForm } from './focus-form';
export function EmployeeEditor({
  person,
  close,
  saved,
}: {
  person?: Person;
  close: () => void;
  saved: () => Promise<void>;
}) {
  const { config } = useWorkforce(),
    [form, setForm] = useState({
      id: person?.id || '',
      name: person?.name || '',
      email: person?.email || '',
      office: person?.office || '',
      department: person?.department || '',
      profile: { ...blankProfile, ...person?.profile },
      roles: person?.roles || (['employee'] as Role[]),
      officeScope: person?.officeScope || [],
      revision: person?.revision || 0,
      password: '',
    }),
    [reason, setReason] = useState(''),
    [busy, setBusy] = useState(false),
    [error, setError] = useState('');
  const set = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));
  const profile = (key: keyof Profile, value: unknown) =>
    setForm((f) => ({ ...f, profile: { ...f.profile, [key]: value } }));
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { roles: _r, officeScope: _s, ...basic } = form;
      await workforce('employee', { employee: config.user.canConfigure ? form : basic, reason });
      await saved();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <button className="text-button" onClick={close}>
        ← Cancel and go back
      </button>
      <div className="page-heading">
        <h1>{person ? 'Edit employee' : 'Add employee'}</h1>
      </div>
      <FocusForm className="employment-form" onSubmit={submit}>
        <fieldset>
          <legend>Employee details</legend>
          <div className="form-grid">
            <Field label="Employee ID">
              <input
                required
                maxLength={60}
                pattern="[A-Za-z0-9_-]+"
                disabled={!!person}
                value={form.id}
                onChange={(e) => set('id', e.target.value)}
              />
            </Field>
            <Field label="Full name">
              <input
                required
                maxLength={120}
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
              />
            </Field>
            <Field label="Company email">
              <input
                required
                type="email"
                maxLength={254}
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
              />
            </Field>
            <Field label="Telephone (optional)">
              <input
                type="tel"
                maxLength={40}
                value={form.profile.telephone}
                onChange={(e) => profile('telephone', e.target.value)}
              />
            </Field>
            <Field label="Job title">
              <input
                maxLength={120}
                value={form.profile.jobTitle}
                onChange={(e) => profile('jobTitle', e.target.value)}
              />
            </Field>
            <Field label="Department">
              <select
                required
                value={form.department}
                onChange={(e) => set('department', e.target.value)}
              >
                <option value="">Choose department</option>
                {config.departments
                  .filter((d) => d.active || d.name === form.department)
                  .map((d) => (
                    <option key={d.code}>{d.name}</option>
                  ))}
              </select>
            </Field>
            <Field label="Office">
              <select required value={form.office} onChange={(e) => set('office', e.target.value)}>
                <option value="">Choose office</option>
                {config.offices
                  .filter((o) => o.active || o.code === form.office)
                  .map((o) => (
                    <option key={o.code} value={o.code}>
                      {o.name}
                    </option>
                  ))}
              </select>
            </Field>
            <Field label="Manager">
              <select
                value={form.profile.managerId}
                onChange={(e) => profile('managerId', e.target.value)}
              >
                <option value="">Not assigned</option>
                {config.people
                  .filter((p) => p.active && p.id !== form.id && p.roles.includes('manager'))
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
              </select>
            </Field>
          </div>
        </fieldset>
        <fieldset>
          <legend>Employment terms</legend>
          <div className="form-grid">
            <Field label="Employment status">
              <select
                value={form.profile.employmentStatus}
                onChange={(e) => profile('employmentStatus', e.target.value)}
              >
                {[
                  ['active', 'Active'],
                  ['inactive', 'Inactive'],
                  ['suspended', 'Suspended'],
                  ['former', 'Former employee'],
                ].map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Employment type">
              <select
                value={form.profile.employmentType}
                onChange={(e) => profile('employmentType', e.target.value)}
              >
                <option value="">Not configured</option>
                {['full-time', 'part-time', 'temporary', 'contractor'].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </Field>
            <Field label="Employment start date">
              <input
                type="date"
                value={form.profile.startDate}
                onChange={(e) => profile('startDate', e.target.value)}
              />
            </Field>
            <Field label="Final employment date">
              <input
                type="date"
                min={form.profile.startDate || undefined}
                value={form.profile.endDate}
                onChange={(e) => profile('endDate', e.target.value)}
              />
            </Field>
            <Field label="Contracted hours per week">
              <input
                type="number"
                min="0"
                max="168"
                step="0.25"
                value={form.profile.weeklyMinutes === null ? '' : form.profile.weeklyMinutes / 60}
                onChange={(e) =>
                  profile(
                    'weeklyMinutes',
                    e.target.value === '' ? null : Number(e.target.value) * 60,
                  )
                }
              />
            </Field>
            <Field label="Time zone">
              <input
                placeholder={
                  'Use office time zone' +
                  (config.offices.find((o) => o.code === form.office)?.timezone
                    ? ' (' + config.offices.find((o) => o.code === form.office)?.timezone + ')'
                    : '')
                }
                value={form.profile.timezone}
                onChange={(e) => profile('timezone', e.target.value)}
                list="hmf-timezones"
              />
              <datalist id="hmf-timezones">
                <option>Europe/London</option>
                <option>Asia/Karachi</option>
                {config.offices.map((o) => (
                  <option key={o.code}>{o.timezone}</option>
                ))}
              </datalist>
            </Field>
          </div>
          <p className="muted">
            Inactive, suspended and former accounts cannot sign in. Existing history is retained. A
            final date ends access after that date in the employee’s time zone.
          </p>
        </fieldset>
        <details className="workforce-disclosure">
          <summary>Holiday allowance</summary>
          <div className="form-grid">
            <Field label="Allowance unit">
              <select
                value={form.profile.holidayUnit}
                onChange={(e) => profile('holidayUnit', e.target.value)}
              >
                <option value="days">Days</option>
                <option value="hours">Hours</option>
              </select>
            </Field>
            <Field label="Annual allowance">
              <input
                type="number"
                min="0"
                max="10000"
                step="0.25"
                value={form.profile.holidayAllowance ?? ''}
                onChange={(e) =>
                  profile('holidayAllowance', e.target.value === '' ? null : Number(e.target.value))
                }
              />
            </Field>
            <Field label="Carried forward">
              <input
                type="number"
                min="0"
                max="10000"
                step="0.25"
                value={form.profile.carriedForward ?? ''}
                onChange={(e) =>
                  profile('carriedForward', e.target.value === '' ? null : Number(e.target.value))
                }
              />
            </Field>
          </div>
          <p className="muted">
            Enter HMF’s agreed allowance, or leave blank. Configured allowances are used by Leave.
            Accrual is not enabled.
          </p>
        </details>
        {config.user.canConfigure && (
          <details className="workforce-disclosure">
            <summary>Account access and demo password</summary>
            <div className="check-list">
              {roles.map((r) => (
                <label className="check-label" key={r}>
                  <input
                    type="checkbox"
                    checked={form.roles.includes(r)}
                    disabled={r === 'employee'}
                    onChange={(e) =>
                      set(
                        'roles',
                        e.target.checked ? [...form.roles, r] : form.roles.filter((x) => x !== r),
                      )
                    }
                  />
                  {roleLabel[r]}
                </label>
              ))}
            </div>
            {form.roles.includes('hr_admin') && (
              <fieldset>
                <legend>Offices authorized for HR access</legend>
                {config.offices.map((o) => (
                  <label className="check-label" key={o.code}>
                    <input
                      type="checkbox"
                      checked={form.officeScope.includes(o.code)}
                      onChange={(e) =>
                        set(
                          'officeScope',
                          e.target.checked
                            ? [...form.officeScope, o.code]
                            : form.officeScope.filter((c) => c !== o.code),
                        )
                      }
                    />
                    {o.name}
                  </label>
                ))}
              </fieldset>
            )}
            <Field
              label={person ? 'Reset demo password (optional)' : 'Initial demo password (optional)'}
            >
              <input
                type="password"
                autoComplete="new-password"
                minLength={12}
                maxLength={128}
                value={form.password}
                onChange={(e) => set('password', e.target.value)}
              />
            </Field>
            <p className="muted">
              Use fictional test accounts here. A new account without a password cannot sign in
              until a system administrator sets one. Microsoft sign-in is a later phase.
            </p>
          </details>
        )}
        <Field label="Reason for this change">
          <textarea
            required
            maxLength={500}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Saved in the employee’s audit history."
          />
        </Field>
        <Notice error={error} />
        <div className="form-actions">
          <button className="primary" disabled={busy}>
            {busy ? 'Saving…' : person ? 'Save employee' : 'Create employee'}
          </button>
          <button type="button" className="secondary" onClick={close} disabled={busy}>
            Cancel
          </button>
        </div>
      </FocusForm>
    </>
  );
}
