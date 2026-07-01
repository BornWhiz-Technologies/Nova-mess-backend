const validateRegister = (req, res, next) => {
  const errors = [];
  const { username, email, mobileNumber, password, confirmPassword, role } = req.body || {};

  if (!username || username.trim() === '') {
    errors.push('Username is required');
  } else if (username.trim().length < 3) {
    errors.push('Username must be at least 3 characters');
  } else if (username.trim().length > 30) {
    errors.push('Username must be at most 30 characters');
  } else if (!/^[A-Za-z0-9_]+$/.test(username.trim())) {
    errors.push('Username can only contain letters, numbers and underscore');
  }

  if (!email || email.trim() === '') {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.push('Email must be a valid email address');
  }

  if (!mobileNumber || mobileNumber.trim() === '') {
    errors.push('Mobile number is required');
  } else if (!/^\d{10}$/.test(mobileNumber.trim())) {
    errors.push('Mobile number must be exactly 10 digits');
  }

  if (!password) {
    errors.push('Password is required');
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
  }

  if (confirmPassword !== password) {
    errors.push('Confirm password must match password');
  }

  if (!role) {
    errors.push('Role is required');
  } else if (!['student', 'manager', 'admin'].includes(role)) {
    errors.push('Role must be student, manager or admin');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

module.exports = validateRegister;
