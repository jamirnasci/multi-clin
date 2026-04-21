'use server'

import { sequelize } from "@/src/db/Sequelize"
import { syncDb } from "@/src/models/init"
import { Paciente } from "@/src/models/Paciente"
import { IPaciente } from "@/src/types/IPaciente"

export async function createPaciente(data: Partial<IPaciente>) {

    try {
        await Paciente.create(data)
        return {
            success: true,
            msg: 'Paciente cadastrado com sucesso'
        }
    } catch (error) {
        return {
            success: false,
            msg: 'Falha ao cadastrar paciente'
        }
    }
}

async function db() {
    try {
        await sequelize.authenticate();
        await syncDb()
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

