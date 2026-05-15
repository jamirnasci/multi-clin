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
  telefone: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.ENUM('ATIVO', 'INATIVO'),
    defaultValue: "ATIVO",
  }
}, {
  tableName: "colaboradores",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});
