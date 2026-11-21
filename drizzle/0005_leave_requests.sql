CREATE TABLE leave_requests (
  id TEXT PRIMARY KEY NOT NULL,
  employee_id TEXT NOT NULL REFERENCES employees(id),
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  timezone TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  decided_by TEXT REFERENCES employees(id),
  decided_at TEXT,
  decision_note TEXT,
  CONSTRAINT leave_valid_dates CHECK (end_date >= start_date),
  CONSTRAINT leave_valid_status CHECK (status IN ('pending','approved','declined','cancelled'))
);
--> statement-breakpoint
CREATE INDEX leave_requests_employee_dates ON leave_requests(employee_id,start_date,end_date);
