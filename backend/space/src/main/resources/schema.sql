CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    permission VARCHAR(50) NOT NULL,
    company_id INT REFERENCES companies(id) ON DELETE SET NULL
);

CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    contact_info TEXT
);

CREATE TABLE rocket_static_data (
    id SERIAL PRIMARY KEY,
    rocket_name VARCHAR(100) NOT NULL,
    launch_date DATE,
    total_cost DECIMAL(15, 2),
    initial_fuel_level DECIMAL(10, 2),
    initial_supplies DECIMAL(10, 2),
    initial_oxygen_levels DECIMAL(10, 2),
    initial_power DECIMAL(10, 2),
    company_id INT REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rocket_id INT REFERENCES rocket_static_data(id) ON DELETE CASCADE,
    viewed BOOLEAN DEFAULT FALSE
);

CREATE TABLE crew_data (
    id SERIAL PRIMARY KEY,
    rocket_id INT REFERENCES rocket_static_data(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    gender VARCHAR(10),
    age INT,
    weight DECIMAL(5, 2),
    BMI DECIMAL(4, 2)
);

CREATE TABLE rocket_stage_reuse (
    id SERIAL PRIMARY KEY,
    rocket_id INT REFERENCES rocket_static_data(id) ON DELETE CASCADE,
    stage_number INT NOT NULL,
    reuse_count INT DEFAULT 0
);
