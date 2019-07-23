UPDATE messages
SET user_id = ${user_id}, message_content = ${message_content}, event_id = ${event_id}, message_date = ${message_date}
WHERE message_id = ${message_id};

SELECT * FROM messages 
WHERE user_id = ${user_id}