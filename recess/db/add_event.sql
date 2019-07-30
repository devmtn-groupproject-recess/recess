INSERT INTO events (event_name, event_type, event_date, event_creator_id, event_description, event_location_lat, event_location_long, event_city, event_state)
VALUES (${event_name}, ${event_type}, ${event_date}, ${event_creator_id}, ${event_description}, ${event_location_lat}, ${event_location_long}, ${event_city}, ${event_state});

SELECT * FROM events 