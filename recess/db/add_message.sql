INSERT INTO messages(user_id, message_content, event_id, message_date)
VALUES (${user_id}, ${message_content}, ${event_id}, ${message_date});
 
SELECT * FROM messages
WHERE event_id = ${event_id};