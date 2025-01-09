-- Create the database
CREATE DATABASE gymdb;

-- Create the table
CREATE TABLE example (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);


-- EXERCISE SCHEMA
CREATE TABLE exercises (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INT NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT TRUE
);