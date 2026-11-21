CREATE TABLE `access_grants` (
	`employee_id` text PRIMARY KEY NOT NULL,
	`roles` text NOT NULL,
	`offices` text NOT NULL,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `attendance_details` (
	`employee_id` text NOT NULL,
	`date` text NOT NULL,
	`definition` text NOT NULL,
	`approval` text NOT NULL,
	`decided_by` text,
	`decided_at` text,
	`decision_note` text,
	PRIMARY KEY(`employee_id`, `date`),
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `audit_events` (
	`id` text PRIMARY KEY NOT NULL,
	`employee_id` text,
	`actor_id` text NOT NULL,
	`action` text NOT NULL,
	`before_value` text,
	`after_value` text,
	`reason` text NOT NULL,
	`source` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `directory_settings` (
	`kind` text NOT NULL,
	`code` text NOT NULL,
	`data` text NOT NULL,
	`updated_at` text NOT NULL,
	PRIMARY KEY(`kind`, `code`)
);
--> statement-breakpoint
CREATE TABLE `employee_profiles` (
	`employee_id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`revision` integer DEFAULT 1 NOT NULL,
	`created_at` text,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `import_previews` (
	`id` text PRIMARY KEY NOT NULL,
	`actor_id` text NOT NULL,
	`rows` text NOT NULL,
	`expires_at` integer NOT NULL,
	`used_at` text
);
--> statement-breakpoint
CREATE TABLE `schedule_versions` (
	`id` text PRIMARY KEY NOT NULL,
	`series_id` text NOT NULL,
	`employee_id` text,
	`name` text NOT NULL,
	`kind` text NOT NULL,
	`start_date` text,
	`end_date` text,
	`days` text NOT NULL,
	`template_id` text,
	`reason` text NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`created_by`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
