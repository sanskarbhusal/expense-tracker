CREATE TYPE "public"."categories" AS ENUM('food', 'clothing', 'rent', 'entertainment', 'investment', 'transportation', 'salary', 'borrowed', '');--> statement-breakpoint
CREATE TYPE "public"."transaction_types" AS ENUM('expense', 'income');--> statement-breakpoint
CREATE TABLE "accounts" (
	"email" varchar(255) PRIMARY KEY NOT NULL,
	"password_hash" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"transaction_type" "transaction_types" NOT NULL,
	"category" "categories" NOT NULL,
	"transaction_description" text,
	"transaction_date" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_email_accounts_email_fk" FOREIGN KEY ("email") REFERENCES "public"."accounts"("email") ON DELETE no action ON UPDATE no action;