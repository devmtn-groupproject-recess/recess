INSERT INTO users_events (user_id, event_id)
VALUES (${user_id}, ${event_id});

SELECT * FROM users u
JOIN users_events ue ON u.user_id = ue.user_id
JOIN events e ON e.event_id = ue.event_id
WHERE u.user_id = ${user_id}  
