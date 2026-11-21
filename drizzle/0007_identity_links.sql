CREATE TABLE `identity_links` (
	`provider` text NOT NULL,
	`subject` text NOT NULL,
	`employee_id` text NOT NULL,
	`email` text NOT NULL,
	`linked_at` text NOT NULL,
	`last_seen_at` text NOT NULL,
	PRIMARY KEY(`provider`, `subject`),
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `identity_links_employee` ON `identity_links` (`employee_id`);