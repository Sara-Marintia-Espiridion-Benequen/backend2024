const staffQueries = {
    getAllStaff: 'SELECT * FROM staff',
    getById: 'SELECT * FROM staff WHERE id = ?',
    create: `
        INSERT INTO staff (first_name, last_name, birth_date, gender, phone_number, email, address, is_active, user_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `,
    update: `
        UPDATE staff 
        SET first_name = ?, last_name = ?, birth_date = ?, gender = ?, phone_number = ?, email = ?, address = ?, is_active = ?, user_id = ?, updated_at = NOW()
        WHERE id = ?
    `,
    delete: 'DELETE FROM staff WHERE id = ?',
    checkUserId: 'SELECT * FROM users WHERE id = ?'
};

module.exports = { staffQueries };
