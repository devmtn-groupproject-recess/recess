CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_first_name VARCHAR,
    user_last_name VARCHAR,
    user_address VARCHAR,
    user_city VARCHAR,
    user_state VARCHAR,
    user_zip INTEGER,
    user_phone INTEGER
);

CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR,
    event_type VARCHAR,
    event_date TIMESTAMP,
    event_creator_id INTEGER REFERENCES users(user_id),
    event_description TEXT,
    event_location_lat INTEGER,
    event_location_long INTEGER
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