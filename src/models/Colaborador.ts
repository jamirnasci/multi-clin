import { DataTypes } from "sequelize";
import { sequelize } from "@/src/db/Sequelize";
import { Agendamento } from "./Agendamento";

export const Colaborador = sequelize.define("Colaborador", {
  idcolaborador: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: DataTypes.STRING,
  email: DataTypes.STRING,
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('ativo', 'inativo'), // pode ser "ativo", "inativo", etc
    defaultValue: "ativo",
  },
  cargo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "colaboradores",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});
