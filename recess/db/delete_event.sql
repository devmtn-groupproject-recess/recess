UPDATE messages
SET event_id = null
WHERE event_id = $1;

UPDATE users_events 
SET event_id = null
WHERE event_id = $1;
  
DELETE FROM events 
WHERE event_id = $1;

DELETE FROM users_events
WHERE event_id IS null;

DELETE FROM messages
WHERE event_id IS null;

SELECT * from events
