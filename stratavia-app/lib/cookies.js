import { serialize } from 'cookie';

// Configurações de cookie
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 7 // 7 dias
};

// Definir token no cookie
export function setTokenCookie(res, token) {
  const cookie = serialize('token', token, COOKIE_OPTIONS);
  res.setHeader('Set-Cookie', cookie);
}

// Remover cookie
export function removeTokenCookie(res) {
  const cookie = serialize('token', '', {
    ...COOKIE_OPTIONS,
    maxAge: -1
  });
  res.setHeader('Set-Cookie', cookie);
}

// Extrair token da requisição
export function getTokenFromRequest(req) {
  // Verificar cookie primeiro
  const token = req.cookies?.token;
  if (token) return token;
  
  // Verificar header Authorization
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  
  return null;
}