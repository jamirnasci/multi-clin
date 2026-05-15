import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import { IUsuario } from "@/src/types/IUsuario"
import Usuario from "@/src/models/Usuario"

export const authOptions: NextAuthOptions = {    
    pages: {
        signIn: '/'
    },
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'E-mail', type: 'email', placeholder: 'E-mail' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {

                if (!credentials?.email || !credentials?.password) {
                    return null
                }
                const usuario = await Usuario.findOne({
                    where: { email: credentials.email }
                })

                if (!usuario) {
                    return null
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, usuario.password)
                console.log(isPasswordValid)
                if (!isPasswordValid) {
                    return null
                }

                return {
                    id: String(usuario.idusuario),
                    email: usuario.email,
                    role: usuario.role
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {

            if (user) {
                token.role = user.role
            }

            return token
        },

        async session({ session, token }: any) {

            session.user.role = token.role

            return session
        }
    }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };