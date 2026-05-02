export interface IAgendamento {
    id: number
    data: Date | null
    hora: Date | null
    valorFinal: number
    status: string
    paciente_id: number | null
    colaborador_id: number | null
    procedimento_id: number | null
}