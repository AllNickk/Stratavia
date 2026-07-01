import { NextResponse } from 'next/server';

export function proxy(requisicao) {
  // Puxando o crachá que a API agora vai criar corretamente
  const usuario_logado = requisicao.cookies.get('sessao_stratavia')?.value;

  const url_atual = requisicao.nextUrl.pathname;

  if (url_atual === '/') {
    if (usuario_logado) {
      return NextResponse.redirect(new URL('/chat', requisicao.url));
    } else {
      return NextResponse.redirect(new URL('/login', requisicao.url));
    }
  }

  const rotas_protegidas = ['/chat', '/dashboard', '/exploration', '/settings'];
  
  if (rotas_protegidas.includes(url_atual) && !usuario_logado) {
    return NextResponse.redirect(new URL('/login', requisicao.url));
  }

  const rotas_publicas = ['/login', '/register'];
  
  if (rotas_publicas.includes(url_atual) && usuario_logado) {
    return NextResponse.redirect(new URL('/chat', requisicao.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};