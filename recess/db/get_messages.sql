SELECT * FROM messages m
JOIN events_messages em ON em.message_id = m.message_id
JOIN events e ON em.event_id = e.event_id
JOIN users u ON m.user_id = u.user_id

WHERE m.event_id = $1