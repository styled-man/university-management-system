CREATE TABLE "enrollment"(
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "section_id" INTEGER NOT NULL,
    "grade" DECIMAL(8, 2) NOT NULL
);
ALTER TABLE "enrollment"
ADD PRIMARY KEY("id");
CREATE TABLE "teacher"("id" INTEGER NOT NULL);
ALTER TABLE "teacher"
ADD PRIMARY KEY("id");
CREATE TABLE "student"(
    "id" SERIAL NOT NULL,
    "major" VARCHAR(255) NULL,
    "gpa" DECIMAL(8, 2) NULL DEFAULT '2',
    "credits" INTEGER NULL
);
ALTER TABLE "student"
ADD PRIMARY KEY("id");
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
CREATE TABLE "course"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "department" VARCHAR(255) NOT NULL,
    "credits" INTEGER NOT NULL
);
ALTER TABLE "course"
ADD PRIMARY KEY("id");
CREATE TABLE "section"(
    "id" SERIAL NOT NULL,
    "semester_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "classroom_id" INTEGER NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "start_time" TIME(0) WITHOUT TIME ZONE NOT NULL,
    "end_time" TIME(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE "section"
ADD PRIMARY KEY("id");
CREATE TABLE "semester"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL
);
ALTER TABLE "semester"
ADD PRIMARY KEY("id");
CREATE TABLE "classroom"(
    "id" SERIAL NOT NULL,
    "building" VARCHAR(255) NOT NULL,
    "room_number" VARCHAR(255) NOT NULL,
    "maximum_capacity" INTEGER NOT NULL
);
ALTER TABLE "classroom"
ADD PRIMARY KEY("id");
ALTER TABLE "address"
ADD CONSTRAINT "address_profile_info_id_foreign" FOREIGN KEY("profile_info_id") REFERENCES "profile_info"("id");
ALTER TABLE "section"
ADD CONSTRAINT "section_classroom_id_foreign" FOREIGN KEY("classroom_id") REFERENCES "classroom"("id");
ALTER TABLE "section"
ADD CONSTRAINT "section_semester_id_foreign" FOREIGN KEY("semester_id") REFERENCES "semester"("id");
ALTER TABLE "student"
ADD CONSTRAINT "student_id_foreign" FOREIGN KEY("id") REFERENCES "profile_info"("id");
ALTER TABLE "section"
ADD CONSTRAINT "section_course_id_foreign" FOREIGN KEY("course_id") REFERENCES "course"("id");
ALTER TABLE "section"
ADD CONSTRAINT "section_teacher_id_foreign" FOREIGN KEY("teacher_id") REFERENCES "teacher"("id");
ALTER TABLE "teacher"
ADD CONSTRAINT "teacher_id_foreign" FOREIGN KEY("id") REFERENCES "profile_info"("id");
ALTER TABLE "enrollment"
ADD CONSTRAINT "enrollment_section_id_foreign" FOREIGN KEY("section_id") REFERENCES "section"("id");
ALTER TABLE "enrollment"
ADD CONSTRAINT "enrollment_student_id_foreign" FOREIGN KEY("student_id") REFERENCES "student"("id");
--
ALTER SEQUENCE profile_info_id_seq RESTART WITH 2348820;