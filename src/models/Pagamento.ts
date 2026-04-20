import { DataTypes } from "sequelize";
import { sequelize } from "@/src/db/Sequelize";
import { Agendamento } from "./Agendamento";

export const Pagamento = sequelize.define("Pagamento", {
  idpagamento: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  metodo: {
    type: DataTypes.STRING, // ex: dinheiro, pix, cartão
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pendente', 'pago', 'estornado'), // ex: pendente, pago, cancelado
    defaultValue: "pendente",
  },
  agendamento_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "pagamentos",
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});