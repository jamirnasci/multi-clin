export interface IPaciente {
    idpaciente: number | null
    nome: string
    cpf: string
    telefone: string
    email: string
    dataNasc: Date | null
    estado: string
    cidade: string
    bairro: string
    logradouro: string
    numApto: string
    cep: string
    obs: string
}