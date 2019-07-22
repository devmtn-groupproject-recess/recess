UPDATE events
SET event_name = ${event_name}, event_type = ${event_type}, event_date = ${event_date}, event_description = ${event_description}, event_location_lat = ${event_location_lat}, event_location_long = ${event_location_long}
WHERE event_id = ${event_id};