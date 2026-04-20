'use server'

import { Procedimento } from "@/src/models/Procedimento"
import { IProcedimento } from "@/src/types/IProcedimento"

export async function createProcedimento(data: Partial<IProcedimento>) {
    try {
        await Procedimento.create(data)
        return {
            success: true,
            msg: 'Procedimento cadastrado com sucesso'
        }
    } catch (error) {
        return {
            success: false,
            msg: 'Falha ao cadastrar procedimento'
        }
    }
}