import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // redireciona se não estiver logado
  },
});

export const config = {
  matcher: [
    "/colaboradores/:path*",
    "/pacientes/:path*",
    "/procedimentos/:path*",
    "/agendamentos/:path*",
    "/pagamentos/:path*",
  ],
};