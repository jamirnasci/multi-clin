'use server'
import { Colaborador } from "@/src/models/Colaborador"
import { IColaborador } from "@/src/types/IColaborador"

export async function createColaborador(data: Partial<IColaborador>) {
    try {       
        await Colaborador.create(data)
        return {
            success: true,
            msg: 'Colaborador cadastrado com sucesso'
        }
    } catch (error) {
        console.log(`createColaborador error: ${error}`)
        return {
            success: false,
            msg: 'Falha ao cadastrar colaborador'
        }
    }
}