DELETE FROM users_events
WHERE user_id = ${user_id} AND event_id = ${event_id};

SELECT * FROM users_events
WHERE user_id = ${user_id}