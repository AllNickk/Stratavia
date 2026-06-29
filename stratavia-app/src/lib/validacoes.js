// Validação de email
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  return emailRegex.test(email);
}

// Validação de senha
export function validatePassword(password) {
  if (!password || password.length < 6) {
    return { valid: false, message: 'Senha deve ter pelo menos 6 caracteres' };
  }
  
  // Verificar se tem pelo menos uma letra e um número
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  if (!hasLetter || !hasNumber) {
    return { valid: false, message: 'Senha deve conter pelo menos uma letra e um número' };
  }
  
  return { valid: true };
}

// Validação de nome
export function validateName(name) {
  if (!name || name.trim().length < 3) {
    return { valid: false, message: 'Nome deve ter pelo menos 3 caracteres' };
  }
  
  if (name.trim().length > 100) {
    return { valid: false, message: 'Nome deve ter no máximo 100 caracteres' };
  }
  
  return { valid: true };
}