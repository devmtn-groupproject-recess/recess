UPDATE users
SET user_first_name = ${user_first_name}, user_last_name = ${user_last_name}, user_address = ${user_address}, user_city = ${user_city}, user_state = ${user_state}, user_zip = ${user_zip}, user_phone = ${user_phone}
WHERE user_id = ${user_id}

RETURNING *;