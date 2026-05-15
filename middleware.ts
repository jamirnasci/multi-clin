import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req){
    const token: any = req.nextauth.token
    const pathname = req.nextUrl.pathname
    const isAdm = token.role == 'ADM'
    if(pathname.startsWith('/adm') && !isAdm){
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
  , 
  {
  pages: {
    signIn: "/", // redireciona se não estiver logado
  },
  callbacks:{
    authorized: ({ token }) => !!token,
  }
});

export const config = {
  matcher: [
    "/adm/:path*",
    "/colaboradores/:path*",
    "/usuarios/:path*",
    "/pacientes/:path*",
    "/procedimentos/:path*",
    "/agendamentos/:path*",
    "/pagamentos/:path*",
  ],
};