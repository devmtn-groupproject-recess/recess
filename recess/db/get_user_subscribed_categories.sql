SELECT * FROM users_categories uc
JOIN users u ON uc.user_id = u.user_id
JOIN categories c ON uc.category_id = c.category_id
WHERE u.user_id = $1