'use server'

import { Colaborador } from "@/src/models/Colaborador";
import { IColaborador } from "@/src/types/IColaborador";

export async function updateColaborador(c: Partial<IColaborador>, id: number) {
    try {
        console.log(c)
        const result = await Colaborador.update({
            nome: c.nome,
            cpf: c.cpf,
            telefone: c.telefone,
            email: c.email,
            status: c.status
        }, {
            where: {
                idcolaborador: id
            }
        })
        return {
            success: true,
            msg: 'Colaborador atualizado com sucesso'
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            msg: 'Falha ao atualizar colaborador'
        }
    }
}