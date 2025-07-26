
const isRequired = (value, fieldName) => {
    if (!value || value.trim() === '') {
        return `${fieldName} is required`;
    }
    return null;
};

// Validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailRegex.test(email)) {
        return 'Please provide a valid email address';
    }
    return null;
};

// Validate password length
const isValidPassword = (password) => {
    if (!password || typeof password !== 'string' || password.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    return null;
};

// Validate if the value is a valid phone number
const isValidPhoneNumber = (contact) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (contact && !phoneRegex.test(contact)) {
        return 'Please provide a valid phone number';
    }
    return null;
};

// Validate that the birth date ensures the user is 18 years or older

// Main user validation function
const validateUser = (userData) => {
    const errors = [];

    // Check each field for validity
    console.log("validating user data:", userData);
    const emailError = isValidEmail(userData.email);
    if (emailError) errors.push(emailError);

    const passwordError = isValidPassword(userData.password);
    if (passwordError) errors.push(passwordError);

    const firstNameError = isRequired(userData.first_name, 'First name');
    if (firstNameError) errors.push(firstNameError);

    const lastNameError = isRequired(userData.last_name, 'Last name');
    if (lastNameError) errors.push(lastNameError);

    const genderError = isRequired(userData.gender, 'Gender');
    if (genderError) errors.push(genderError);

    const contactError = isValidPhoneNumber(userData.contact);
    if (contactError) errors.push(contactError);

    return errors;
};

module.exports = validateUser;
