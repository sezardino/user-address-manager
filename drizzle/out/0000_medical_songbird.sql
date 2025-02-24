CREATE TABLE "users_addresses" (
	"user_id" serial NOT NULL,
	"address_type" varchar(7) NOT NULL,
	"valid_from" timestamp NOT NULL,
	"post_code" varchar(6) NOT NULL,
	"city" varchar(60) NOT NULL,
	"country_code" varchar(3) NOT NULL,
	"street" varchar(100) NOT NULL,
	"building_number" varchar(60) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(60),
	"last_name" varchar(100) NOT NULL,
	"initials" varchar(30),
	"email" varchar(100) NOT NULL,
	"status" varchar(8) DEFAULT 'ACTIVE' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "users_addresses" ADD CONSTRAINT "users_addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;