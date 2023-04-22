CREATE TABLE "profile_info"(
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(97) NOT NULL,
    "phone_number" VARCHAR(10) NOT NULL,
    "gender" VARCHAR(50) NULL DEFAULT 'N/A',
    "date_of_birth" DATE NULL
);
ALTER TABLE "profile_info"
ADD PRIMARY KEY("id");
ALTER TABLE "profile_info"
ADD CONSTRAINT "profile_info_email_unique" UNIQUE("email");
CREATE TABLE "address"(
    "id" SERIAL NOT NULL,
    "profile_info_id" INTEGER NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "street2" VARCHAR(255) NULL,
    "street3" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "zip_code" VARCHAR(9) NOT NULL
);
ALTER TABLE "address"
ADD PRIMARY KEY("id");
ALTER TABLE "address"
ADD CONSTRAINT "address_profile_info_id_foreign" FOREIGN KEY("profile_info_id") REFERENCES "profile_info"("id");