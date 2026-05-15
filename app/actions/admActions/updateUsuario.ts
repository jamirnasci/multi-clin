'use server'

import Usuario from "@/src/models/Usuario"
import { IUsuario } from "@/src/types/IUsuario"
import bcrypt from 'bcrypt'

export async function admUpdateUsuario(u: Partial<IUsuario>, id: number, newPassword: string | null) {
    try {
        const userFound = await Usuario.findByPk(id)
        if (!userFound) {
            return {
                success: false,
                msg: 'Usuário não encontrado'
            }
        }
        
        const result = await Usuario.update({            
            nome: u.nome,
            cpf: u.cpf,
            telefone: u.telefone,
            email: u.email,
            status: u.status,
            role: u.role,
        }, {
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