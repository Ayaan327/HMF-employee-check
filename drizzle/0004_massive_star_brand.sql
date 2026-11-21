CREATE TABLE `time_corrections` (
	`id` text PRIMARY KEY NOT NULL,
	`employee_id` text NOT NULL,
	`date` text NOT NULL,
	`proposed` text NOT NULL,
	`base_revision` integer NOT NULL,
	`status` text NOT NULL,
	`requested_by` text NOT NULL,
	`reason` text NOT NULL,
	`created_at` text NOT NULL,
	`decided_by` text,
	`decided_at` text,
	`decision_note` text,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `correction_employee_idx` ON `time_corrections` (`employee_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `work_records` (
	`employee_id` text NOT NULL,
	`date` text NOT NULL,
	`check_in` text NOT NULL,
	`check_out` text,
	`break_minutes` integer DEFAULT 0 NOT NULL,
	`snapshot` text NOT NULL,
	`revision` integer DEFAULT 1 NOT NULL,
	`employee_note` text DEFAULT '' NOT NULL,
	`manager_note` text DEFAULT '' NOT NULL,
	`overtime_state` text DEFAULT 'pending' NOT NULL,
	`updated_at` text NOT NULL,
	PRIMARY KEY(`employee_id`, `date`),
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `work_date_idx` ON `work_records` (`date`);