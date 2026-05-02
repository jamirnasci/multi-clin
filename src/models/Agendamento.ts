import { DataTypes } from "sequelize";
import { sequelize } from "@/src/db/Sequelize";
import { Paciente } from "./Paciente";
import { Colaborador } from "./Colaborador";
import { Procedimento } from "./Procedimento";
import { Pagamento } from "./Pagamento";

export const Agendamento = sequelize.define("Agendamento", {
    idagendamento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    valorFinal: {
        type: DataTypes.DECIMAL(10, 2),
    },
    status: {
        type: DataTypes.ENUM('AGENDADO', 'FINALIZADO', 'CONFIRMADO', 'CANCELADO'), // ex: agendado, concluido, cancelado
        defaultValue: "AGENDADO",
    },
    paciente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    colaborador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    procedimento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "agendamentos",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
});