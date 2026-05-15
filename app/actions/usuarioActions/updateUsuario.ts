'use server'

import Usuario from "@/src/models/Usuario"
import { IUsuario } from "@/src/types/IUsuario"
import bcrypt from 'bcrypt'

export async function updateUsuario(u: Partial<IUsuario>, id: number, newPassword: string | null) {
    try {
        if (!u.password) {
            return {
                success: false,
                msg: 'É necessário preencher o campo senha para atualizar usuário'
            }
        }

        const userFound = await Usuario.findByPk(id)
        if (!userFound) {
            return {
                success: false,
                msg: 'Usuário não encontrado'
            }
        }
        const passwordMatch = await bcrypt.compare(u.password, userFound.password)
        if (!passwordMatch) {
            return {
                success: false,
                msg: 'Senha incorreta'
            }
        } 
        let data: any = {
            nome: u.nome,
            cpf: u.cpf,
            telefone: u.telefone,
            email: u.email,
            status: u.status,
            role: u.role,
        }
        if (newPassword) {
            data = {
                ...data,
                password: u.password
            }
        }
        const result = await Usuario.update(data, {
            where: {
                idusuario: id
            }
        })
        return {
            success: true,
            msg: 'Usuário atualizado com sucesso'
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            msg: 'Falha ao atualizar usuário'
        }
    }
}