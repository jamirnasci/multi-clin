export interface IUsuario{
    idusuario: number | null
    nome: string
    cpf: string
    email: string
    password: string
    telefone: string
    role: 'ADM' | 'USER'
    status: 'ATIVO' | 'INATIVO'
}