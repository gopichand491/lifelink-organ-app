/**
 * Form validation utilities
 */
export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return 'Email is required';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return 'Enter a valid email address';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Include at least one uppercase letter';
  if (!/[0-9]/.test(password)) return 'Include at least one number';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) return 'Phone number is required';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10) return 'Enter a valid 10-digit phone number';
  return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value.trim()) return `${fieldName} is required`;
  return null;
};

export const validateOTP = (otp: string): string | null => {
  if (!otp.trim()) return 'OTP is required';
  if (otp.length !== 6 || !/^\d+$/.test(otp)) return 'Enter a valid 6-digit OTP';
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name.trim()) return 'Full name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  return null;
};
