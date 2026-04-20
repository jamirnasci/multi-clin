import { DataTypes } from "sequelize";
import { sequelize } from "@/src/db/Sequelize";
import { Agendamento } from "./Agendamento";

export const Paciente = sequelize.define("Paciente", {
  idpaciente: {
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
  dataNasc: DataTypes.DATEONLY,
  estado: DataTypes.STRING,
  cidade: DataTypes.STRING,
  bairro: DataTypes.STRING,
  logradouro: DataTypes.STRING,
  numApto: DataTypes.STRING,
  cep: DataTypes.STRING,
  obs: DataTypes.TEXT,
}, {
  tableName: "pacientes",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});