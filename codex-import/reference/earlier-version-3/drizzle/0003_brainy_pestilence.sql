CREATE INDEX `attendance_date_idx` ON `attendance` (`date`);--> statement-breakpoint
CREATE INDEX `audit_employee_date_idx` ON `audit_events` (`employee_id`,`created_at`,`id`);--> statement-breakpoint
CREATE INDEX `import_expiration_idx` ON `import_previews` (`expires_at`);--> statement-breakpoint
CREATE INDEX `schedule_employee_date_idx` ON `schedule_versions` (`employee_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `schedule_series_date_idx` ON `schedule_versions` (`series_id`,`created_at`);