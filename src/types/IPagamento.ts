export interface IPagamento{
    idpagamento: number | null
    valor: number
    metodo: string
    status: string
    agendamento_id: number
}