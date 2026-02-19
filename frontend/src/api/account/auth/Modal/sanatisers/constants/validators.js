// Top 20 most common passwords Django blocks (subset of their full list)
const COMMON_PASSWORDS = new Set([
  'password',
  '12345678',
  '123456789',
  'password1',
  'iloveyou',
  'sunshine',
  'princess',
  'football',
  'welcome1',
  'shadow',
  'superman',
  'michael',
  'charlie',
  'letmein',
  'monkey',
  'dragon',
  'master',
  'qwerty123',
  'passw0rd',
  'abc12345',
  '1q2w3e4r',
  'mustang',
  'access',
  'jessica',
  'baseball',
  'batman',
  'trustno1',
  'hockey',
  'ranger',
  'daniel',
]);

// Mirrors Django's UserAttributeSimilarityValidator
function isTooSimilar(password, ...attributes) {
  const p = password.toLowerCase();
  return attributes.some((attr) => {
    if (!attr) return false;
    const a = attr.toLowerCase();
    // Check if either contains the other, or share a long common substring
    if (p.includes(a) || a.includes(p)) return true;
    // Sliding window — flag if >60% of attribute appears in password
    for (let len = Math.ceil(a.length * 0.6); len <= a.length; len++) {
      for (let i = 0; i <= a.length - len; i++) {
        if (p.includes(a.slice(i, i + len))) return true;
      }
    }
    return false;
  });
}

export const VALIDATORS = {
  username: (v) => {
    if (!v.trim()) return 'Username is required';
    if (v.trim().length > 150) return 'Must be 150 characters or less';
    if (!/^[\w.@+-]+$/.test(v.trim()))
      return 'Only letters, numbers, and . @ + - _';
    return null;
  },

  email: (v) => {
    if (!v.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()))
      return 'Invalid email format';
    return null;
  },

  // Matches all 4 Django default validators
  password: (v, formData = {}) => {
    if (!v.trim()) return 'Password is required';

    // MinimumLengthValidator
    if (v.length < 8) return 'Must be at least 8 characters';

    // NumericPasswordValidator
    if (/^\d+$/.test(v)) return 'Password cannot be entirely numeric';

    // CommonPasswordValidator
    if (COMMON_PASSWORDS.has(v.toLowerCase())) return 'Password is too common';

    // UserAttributeSimilarityValidator
    if (isTooSimilar(v, formData.username, formData.email))
      return 'Password is too similar to your username or email';

    return null;
  },

  phone: (v) => {
    if (!v.trim()) return null;
    if (!/^[0-9+\-\s()]*$/.test(v.trim())) return 'Only numbers and + - ( )';
    return null;
  },
};
