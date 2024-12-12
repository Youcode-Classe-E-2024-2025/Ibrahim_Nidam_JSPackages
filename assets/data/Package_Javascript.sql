CREATE DATABASE IF NOT EXISTS packages_js_db;

USE packages_js_db;

CREATE TABLE authors (
  author_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  registration_date date NOT NULL DEFAULT (CURRENT_DATE)
);

CREATE TABLE packages (
  package_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  description text,
  creation_date date NOT NULL DEFAULT (CURRENT_DATE)
);

CREATE TABLE versions (
  version_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  package_id int NOT NULL,
  version_number varchar(50) NOT NULL,
  release_date date NOT NULL,
  changelog text
);

CREATE TABLE package_authors (
  package_id int NOT NULL,
  author_id int NOT NULL,
  PRIMARY KEY (package_id, author_id)
);

CREATE INDEX package_authors_index_0 ON package_authors (package_id);

CREATE INDEX package_authors_index_1 ON package_authors (author_id);

ALTER TABLE versions ADD FOREIGN KEY (package_id) REFERENCES packages (package_id);

ALTER TABLE package_authors ADD FOREIGN KEY (package_id) REFERENCES packages (package_id);

ALTER TABLE package_authors ADD FOREIGN KEY (author_id) REFERENCES authors (author_id);
