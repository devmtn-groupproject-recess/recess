DELETE FROM messages
WHERE message_id = ${message_id};

SELECT * FROM messages
WHERE event_id = ${event_id}