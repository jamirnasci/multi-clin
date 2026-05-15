'use server'

import Usuario from "@/src/models/Usuario"
import { IUsuario } from "@/src/types/IUsuario"

import bcrypt from 'bcrypt'

export async function createUsuario(u: IUsuario) {
    try {
        if (!u.password) {
            return {
                success: false,
                msg: 'É necessário preencher o campo senha para cadastrar usuário'
            }
        }

        u.password = await bcrypt.hash(u.password, 10)
        await Usuario.create({
            nome: u.nome,
            cpf: u.cpf,
            email: u.email,
            password: u.password,
            role: u.role,
            status: u.status,
            telefone: u.telefone
        })
        return {
            success: true,
            msg: 'Usuário cadastrado com sucesso'
        }
    } catch (error) {
        console.log(`createUsuario error: ${error}`)
        return {
            success: false,
            msg: 'Falha ao cadastrar usuário'
        }
    }
}