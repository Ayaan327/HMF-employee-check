import { InputError } from './core';

export class ConflictError extends InputError {
  constructor(message = 'This record changed. Refresh before trying again.') {
    super(message, 409);
    this.name = 'ConflictError';
  }
}

// D1 exposes SQLite constraint names in its error/cause messages. Translate only
// our named guard here; malformed JSON and unrelated database errors stay errors.
export function databaseConflict(error: unknown): ConflictError | null {
  const visited = new Set<unknown>();
  let current = error;
  while (current && !visited.has(current)) {
    visited.add(current);
    if (current instanceof ConflictError) return current;
    if (current instanceof Error && /\bhmf_write_conflict\b/.test(current.message)) {
      return new ConflictError();
    }
    current = current instanceof Error ? current.cause : undefined;
  }
  return null;
}
