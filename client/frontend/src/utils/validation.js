/**
 * Validação simples de email
 *
 * @param {String} text - email a ser validado
 * @return {Boolean}
 */
export function validateEmail(text) {
  return text?.indexOf("@") !== -1;
}

/**
 * Garante que a senha tenha o comprimento mínimo
 *
 * @param {String} password - senha pra validar
 * @param {Integer} length - a senha deve ser tão longa quanto
 * @return {Boolean}
 */
export function validatePassword(password, length = 7) {
  return password?.length >= length;
}

/**
 * Garante que o nome de usuário contenha apenas letras, números, sublinhados e travessões
 *
 * @param {String} username - nome de usuário a ser validado
 * @return {Boolean}
 */
export function validateUsername(username) {
  return /^[a-zA-Z0-9_-]+$/.test(username);
}

// eslint-disable-next-line
export default {
  email: validateEmail,
  password: validatePassword,
  username: validateUsername,
};
