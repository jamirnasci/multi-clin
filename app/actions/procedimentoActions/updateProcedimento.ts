'use server'

import { Procedimento } from "@/src/models/Procedimento"
import { IProcedimento } from "@/src/types/IProcedimento"

export async function updateProcedimento(data: Partial<IProcedimento>, id: number) {
    try {
        await Procedimento.update(data, {
            where:{
                idprocedimento: id
            }
        })
        return {
            success: true,
            msg: 'Procedimento atualizado com sucesso'
        }
    } catch (error) {
        return {
            success: false,
            msg: 'Falha ao atualizar procedimento'
        }
    }
}
