// Validation.js
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email format";
};

export const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber) ? "" : "Phone number must be 10 digits";
};

export const validateOnlyNumbers = (phoneNumber) => {
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phoneNumber) ? "" : "Phone number can only contain digits";
};

export const validatePassword = (password) => {
    return password.length >= 6 ? "" : "Password must be at least 6 characters long";
};

export const validateRequired = (value) => {
    return value.length >= 3 ? "" : "This field must be at least 3 characters long";
};

export const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword ? "" : "Passwords do not match";
};
