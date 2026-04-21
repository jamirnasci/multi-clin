import { Colaborador } from "@/src/models/Colaborador"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import { IColaborador } from "@/src/types/IColaborador"

export const authOptions = {
    pages:{
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
                console.log('login')
                if(!credentials?.email || !credentials?.password) {
                    return null
                }
                const colaborador = (await Colaborador.findOne({
                    where: { email: credentials.email }
                }))?.get() as IColaborador | undefined;

                if (!colaborador) {
                    return null
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, colaborador.senha)
                console.log(isPasswordValid)
                if (!isPasswordValid) {
                    return null
                }
                
                return {
                    id: String(colaborador.idcolaborador),
                    email: colaborador.email
                }
            },
        }),
    ],
    
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };