import { sqliteTable, text, integer, primaryKey, index } from 'drizzle-orm/sqlite-core';
export const employees = sqliteTable('employees', {
  id: text('id').primaryKey(), name: text('name').notNull(), email: text('email').notNull().unique(),
  office: text('office').notNull(), department: text('department').notNull(), role: text('role').notNull(),
  passwordHash: text('password_hash').notNull(), salt: text('salt').notNull(), active: integer('active').notNull().default(1),
});
export const attendance = sqliteTable('attendance', {
  employeeId: text('employee_id').notNull().references(() => employees.id), date: text('date').notNull(),
  status: text('status').notNull(), reason: text('reason').notNull().default(''), office: text('office').notNull(),
  submittedAt: text('submitted_at').notNull(), updatedAt: text('updated_at').notNull(), source: text('source').notNull(),
}, t => [primaryKey({columns:[t.employeeId,t.date]}),index('attendance_date_idx').on(t.date)]);
export const sessions = sqliteTable('sessions', {
  tokenHash: text('token_hash').primaryKey(), employeeId: text('employee_id').notNull().references(() => employees.id),
  ownerId: text('owner_id').notNull(), expiresAt: integer('expires_at').notNull(),
});
export const audits = sqliteTable('audits', {
  id: text('id').primaryKey(), employeeId: text('employee_id').notNull(), date: text('date').notNull(),
  actorId: text('actor_id').notNull(), previousStatus: text('previous_status'), status: text('status').notNull(),
  reason: text('reason').notNull(), changedAt: text('changed_at').notNull(),
});
export const attempts = sqliteTable('login_attempts', {
  key: text('key').primaryKey(), count: integer('count').notNull(), windowStart: integer('window_start').notNull(),
});
export const accessEvents = sqliteTable('access_events', {
  id: text('id').primaryKey(), employeeId: text('employee_id').notNull().references(() => employees.id),
  event: text('event').notNull(), occurredAt: text('occurred_at').notNull(), office: text('office').notNull(),
});

// Additive Phase 1 tables. Legacy attendance and account rows retain their shape.
export const employeeProfiles = sqliteTable('employee_profiles', {
  employeeId: text('employee_id').primaryKey().references(() => employees.id),
  data: text('data').notNull(), revision: integer('revision').notNull().default(1),
  createdAt: text('created_at'), updatedAt: text('updated_at').notNull(),
});
export const accessGrants = sqliteTable('access_grants', {
  employeeId: text('employee_id').primaryKey().references(() => employees.id),
  roles: text('roles').notNull(), offices: text('offices').notNull(),
});
export const directorySettings = sqliteTable('directory_settings', {
  kind: text('kind').notNull(), code: text('code').notNull(), data: text('data').notNull(),
  updatedAt: text('updated_at').notNull(),
}, t => [primaryKey({columns:[t.kind,t.code]})]);
export const scheduleVersions = sqliteTable('schedule_versions', {
  id: text('id').primaryKey(), seriesId: text('series_id').notNull(),
  employeeId: text('employee_id').references(() => employees.id),
  name: text('name').notNull(), kind: text('kind').notNull(),
  startDate: text('start_date'), endDate: text('end_date'), days: text('days').notNull(),
  templateId: text('template_id'), reason: text('reason').notNull(),
  createdBy: text('created_by').notNull().references(() => employees.id), createdAt: text('created_at').notNull(),
},t=>[index('schedule_employee_date_idx').on(t.employeeId,t.createdAt),index('schedule_series_date_idx').on(t.seriesId,t.createdAt)]);
export const auditEvents = sqliteTable('audit_events', {
  id: text('id').primaryKey(), employeeId: text('employee_id'), actorId: text('actor_id').notNull(),
  action: text('action').notNull(), before: text('before_value'), after: text('after_value'),
  reason: text('reason').notNull(), source: text('source').notNull(), createdAt: text('created_at').notNull(),
},t=>[index('audit_employee_date_idx').on(t.employeeId,t.createdAt,t.id)]);
export const attendanceDetails = sqliteTable('attendance_details', {
  employeeId: text('employee_id').notNull().references(() => employees.id), date: text('date').notNull(),
  definition: text('definition').notNull(), approval: text('approval').notNull(),
  decidedBy: text('decided_by'), decidedAt: text('decided_at'), decisionNote: text('decision_note'),
}, t => [primaryKey({columns:[t.employeeId,t.date]})]);
export const importPreviews = sqliteTable('import_previews', {
  id: text('id').primaryKey(), actorId: text('actor_id').notNull(), rows: text('rows').notNull(),
  expiresAt: integer('expires_at').notNull(), usedAt: text('used_at'),
},t=>[index('import_expiration_idx').on(t.expiresAt)]);
