'use server'
import { Colaborador } from "@/src/models/Colaborador"
import { IColaborador } from "@/src/types/IColaborador"
import bcrypt from 'bcrypt'

export async function createColaborador(data: Partial<IColaborador>) {
    try {
        if (!data.senha) {
            return {
                success: false,
                msg: 'É necessário preencher o campo senha para cadastrar colaborador'
            }
        }
        data.senha = await bcrypt.hash(data.senha, 10)
        console.log(data)
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