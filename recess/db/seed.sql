CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_first_name VARCHAR,
    user_last_name VARCHAR,
    user_address VARCHAR,
    user_city VARCHAR,
    user_state VARCHAR,
    user_zip INTEGER,
    user_phone VARCHAR,
    user_img TEXT
);

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR,
    event_type VARCHAR,
    event_date TIMESTAMP,
    event_creator_id INTEGER REFERENCES users(user_id),
    event_description TEXT,
    event_location_lat DECIMAL,
    event_location_long DECIMAL
) ;

CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    message_content TEXT,
    event_id INTEGER REFERENCES events(event_id),
    message_date TIMESTAMP
) ;

CREATE TABLE users_events (
    user_id INTEGER REFERENCES users(user_id),
    event_id INTEGER REFERENCES events(event_id)
) ;

CREATE TABLE events_messages (
    message_id INTEGER REFERENCES messages(message_id),
    event_id INTEGER REFERENCES events(event_id)
) ;

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR
);

CREATE TABLE users_categories (
    category_id INTEGER REFERENCES categories(category_id),
    user_id INTEGER REFERENCES users(user_id)
); 