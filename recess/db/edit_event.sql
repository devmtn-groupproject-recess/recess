UPDATE events
SET event_name = ${event_name}, event_type = ${event_type}, event_date = ${event_date}, event_creator_id = ${event_creator_id}, event_description = ${event_description}, event_location_lat = ${event_location_lat}, event_location_long = ${event_location_long}, event_city = ${event_city}, event_state = ${event_state}
WHERE event_id = ${event_id}

RETURNING *;