'use server'

import { Paciente } from "@/src/models/Paciente"
import { IPaciente } from "@/src/types/IPaciente"

export async function updatePaciente(data: Partial<IPaciente>, id: number) {
    try {
        await Paciente.update(data, {
            where:{
                idpaciente: id
            }
        })
        return {
            success: true,
            msg: 'Paciente atualizado com sucesso'
        }
    } catch (error) {
        return {
            success: false,
            msg: 'Falha ao atualizar paciente'
        }
    }
}
