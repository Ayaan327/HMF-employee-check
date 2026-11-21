CREATE TABLE `access_events` (
	`id` text PRIMARY KEY NOT NULL,
	`employee_id` text NOT NULL,
	`event` text NOT NULL,
	`occurred_at` text NOT NULL,
	`office` text NOT NULL,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
