INSERT INTO messages(user_id, message_content, event_id, message_date)
VALUES (${user_id}, ${message_content}, ${event_id}, ${message_date});
 
SELECT * FROM messages m 
JOIN users u ON m.user_id = u.user_id
WHERE event_id = ${event_id};