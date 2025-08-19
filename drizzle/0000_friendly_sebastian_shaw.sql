CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar NOT NULL,
	"password" text NOT NULL,
	"refresh_token" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
