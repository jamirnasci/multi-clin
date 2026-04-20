export interface IAgendamento {
    id: number | null
    data: Date | null
    hora: Date | null
    valorFinal: number
    status: string
    paciente: number | null
    colaborador: number | null
    procedimento: number | null
}