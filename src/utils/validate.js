/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function isPhone (phone) {
  return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(phone);
}

export function isEmail (email) {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email);
}

export function isPassword (password) {
  return /^[a-zA-Z0-9]{6,20}$/.test(password);
}

export function isLoginName (loginName) {
  return /^[a-zA-Z0-9_]{6,16}$/.test(loginName);
}

export function isRealName (realName) {
  return /^[\u4e00-\u9fa5]{2,6}$/.test(realName);
}
export function isVerCode (verCode) {
  return /^[a-zA-Z0-9]{4}$/.test(verCode);
}
export function isCardId (cardId) {
  return /(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)|(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx])$/.test(
    cardId
  );
}
