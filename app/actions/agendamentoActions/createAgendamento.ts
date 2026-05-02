'use server'

import { sequelize } from "@/src/db/Sequelize"
import { Agendamento } from "@/src/models/Agendamento"
import { syncDb } from "@/src/models/init"
import { Paciente } from "@/src/models/Paciente"
import { IAgendamento } from "@/src/types/IAgendamento"

export async function createAgendamento(data: Partial<IAgendamento>) {    
    try {
        await Agendamento.create(data)
        return {
            success: true,
            msg: 'Agendamento cadastrado com sucesso'
        }
    } catch (error) {
        return {
            success: false,
            msg: 'Falha ao cadastrar agendamento'
        }
    }
}

