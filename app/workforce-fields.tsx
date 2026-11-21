'use client';
export function Notice({ error, success }: { error?: string; success?: string }) {
  return (
    <>
      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="success" role="status">
          {success}
        </div>
      )}
    </>
  );
}
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label>
      {label}
      {children}
    </label>
  );
}
export function Value({ label, value }: { label: string; value: unknown }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>
        {value === null || value === undefined || value === '' ? 'Not configured' : String(value)}
      </dd>
    </div>
  );
}
