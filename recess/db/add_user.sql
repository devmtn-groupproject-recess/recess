INSERT INTO users(user_first_name, user_last_name, user_address, user_city, user_state, user_zip, user_phone,username, password)
VALUES (${user_first_name}, ${user_last_name}, ${user_address}, ${user_city}, ${user_state}, ${user_zip}, ${user_phone}, ${username}, ${password})

RETURNING *;