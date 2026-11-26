'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { sessionEnded } from './session-expiry';
import { defaultOffices, defaultStatuses, type Office, type Role, type Status } from './lib/core';
export const roleLabel: Record<string, string> = {
  employee: 'Employee',
  manager: 'Manager',
  hr_admin: 'HR administrator',
  system_admin: 'System administrator',
};
type Config = {
  offices: Office[];
  departments: { code: string; name: string; active: boolean }[];
  statuses: Status[];
  people: { id: string; name: string; office: string; roles: Role[]; active: number }[];
  user: { id: string; canManagePeople: boolean; canConfigure: boolean; canViewTeam: boolean };
  today: string;
};
export async function workforce(action: string, body?: unknown, query = ''): Promise<any> {
  const response = await fetch(
    '/api/workforce' + (body ? '' : '?action=' + action + query),
    body
      ? {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, ...(body as object) }),
        }
      : { cache: 'no-store' },
  );
  const data: any = await response.json();
  sessionEnded(response.status);
  if (!response.ok)
    throw new Error(data.error || 'Unable to load this information. Please sign in again.');
  return data;
}
const Context = createContext<{ config: Config; reload: () => Promise<void> }>({
  config: {
    offices: defaultOffices,
    departments: [],
    statuses: defaultStatuses,
    people: [],
    user: { id: '', canManagePeople: false, canConfigure: false, canViewTeam: false },
    today: '',
  },
  reload: async () => {},
});
export const useWorkforce = () => useContext(Context);
export function WorkforceProvider({ children }: { children: React.ReactNode }) {
  const initial = useContext(Context).config,
    [config, setConfig] = useState(initial),
    [error, setError] = useState('');
  async function reload() {
    try {
      setConfig(await workforce('config'));
      setError('');
    } catch (e) {
      setError((e as Error).message);
    }
  }
  useEffect(() => {
    reload();
  }, []);
  return (
    <Context.Provider value={{ config, reload }}>
      {error && (
        <div className="error" role="alert">
          {error}
          <button onClick={reload}>Retry</button>
        </div>
      )}
      {children}
    </Context.Provider>
  );
}
