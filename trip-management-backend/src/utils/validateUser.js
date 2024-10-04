// const validateUserInput = ({ userName, phoneNumber, email, password }) => {
//   if (!userName || !phoneNumber || !email || !password) {
//       return 'All fields are required';
//   }

//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailPattern.test(email)) {
//       return 'Invalid email format';
//   }

//   const phonePattern = /^[0-9]{10}$/;
//   if (!phonePattern.test(phoneNumber)) {
//       return 'Invalid phone number';
//   }

//   if (password.length < 4) {
//       return 'Password should be at least 4 characters long';
//   }

//   return null; // No error
// };

// module.exports = validateUserInput; // Make sure to export it directly


const validateUserInput = (data) => {
  const errors = {};

  // Define validation rules
  const rules = {
      userName: {
          required: true,
          message: 'userName is required',
      },
      phoneNumber: {
          required: true,
          pattern: /^[0-9]{10}$/,
          message: 'Invalid phone number format',
      },
      email: {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Invalid email format',
      },
      password: {
          required: true,
          minLength: 4,
          message: 'Password should be at least 4 characters long',
      },
  };

  // Validate each field based on rules
  for (const field in rules) {
      if (rules[field].required && !data[field]) {
          errors[field] = rules[field].message;
      } else if (rules[field].pattern && !rules[field].pattern.test(data[field])) {
          errors[field] = rules[field].message;
      } else if (rules[field].minLength && data[field].length < rules[field].minLength) {
          errors[field] = rules[field].message;
      }
  }

  return Object.keys(errors).length > 0 ? errors : null; // Return null if no errors
};

module.exports = { validateUserInput };
