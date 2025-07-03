const bcrypt = require('bcrypt');
const User = require('../schemas/user.schema'); // Import the User model

// Service to check if a user already exists by email
const checkIfUserExists = async (email) => {
    return await User.findOne({ email });
};

// Service to hash the password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Service to create a new user
const createUser = async (userData) => {
    const {
        email,
        password,
        first_name,
        last_name,
        gender,
        birthDate,
        contact,
        is_active,
        parent_id
    } = userData;
    const encryptedPassword = await hashPassword(password);
    return await User.create({
        email,
        password: encryptedPassword,
        first_name,
        last_name,
        gender,
        birthDate,
        contact,
        is_active,
        parent_id
    });
};

module.exports = {
    checkIfUserExists,
    createUser
};
