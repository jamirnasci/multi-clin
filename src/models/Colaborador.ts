import { DataTypes } from "sequelize";
import { sequelize } from "@/src/db/Sequelize";

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
    type: DataTypes.ENUM('ATIVO', 'INATIVO'), // pode ser "ativo", "inativo", etc
    defaultValue: "ATIVO",
  }
}, {
  tableName: "colaboradores",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});
