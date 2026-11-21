CREATE TABLE `leave_balance_versions` (
	`employee_id` text PRIMARY KEY NOT NULL,
	`revision` integer NOT NULL,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `leave_request_details` (
	`request_id` text PRIMARY KEY NOT NULL,
	`leave_type` text NOT NULL,
	`note` text NOT NULL,
	`snapshot` text NOT NULL,
	FOREIGN KEY (`request_id`) REFERENCES `leave_requests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `write_guards` (
	`id` text PRIMARY KEY NOT NULL,
	`valid` integer NOT NULL,
	CONSTRAINT "hmf_write_conflict" CHECK("write_guards"."valid" = 1)
);
