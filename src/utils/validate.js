/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function isPhone (phone) {
  return /^1[3456789]\d{9}$/.test(phone);
}

export function isEmail (email) {
  return /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/.test(email);
}

export function isPassword (password) {
  return /^[a-zA-Z0-9]{6,20}$/.test(password);
}
