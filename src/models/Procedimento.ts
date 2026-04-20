import { DataTypes } from "sequelize";
import { sequelize } from "@/src/db/Sequelize";
import { Agendamento } from "./Agendamento";

export const Procedimento = sequelize.define("Procedimento", {
  idprocedimento: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duracao: {
    type: DataTypes.INTEGER, // duração em minutos
    allowNull: false,
  },
  valorPadrao: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('ATIVO', 'INATIVO'), // ativo / inativo
    defaultValue: "ATIVO",
  },
  comissao: {
    type: DataTypes.DECIMAL(5, 2), // porcentagem (ex: 10.00 = 10%)
  },
  descricao: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: "procedimentos",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});