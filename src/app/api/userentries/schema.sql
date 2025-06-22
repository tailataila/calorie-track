CREATE SCHEMA my_schema;

CREATE TABLE my_schema.users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE my_schema.food_entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES my_schema.users (id) ON DELETE CASCADE,
    /*when user deleted, their food entries are also deleted*/
    date DATE NOT NULL,
    calories INTEGER NOT NULL,
    meal TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
/*
id SERIAL PRIMARY KEY = id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY

Next steps:
1. Writing API routes to read/write from this schema
2. Switching your current hardcoded API to use a real database
3. Adding edit/delete logic based on this structure
Add Authentication
Use user_id in API routes
*/