import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize";
import { sequelize } from "@/src/db/Sequelize";

class Usuario extends Model<
    InferAttributes<Usuario>,
    InferCreationAttributes<Usuario>
>{
    declare idusuario: CreationOptional<number>
    declare nome: string
    declare cpf: string
    declare email: string
    declare password: string
    declare telefone: string
    declare role: 'ADM' | 'USER'
    declare status: 'ATIVO' | 'INATIVO'
}

Usuario.init({
    idusuario: {
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
        unique: true
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
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('ATIVO', 'INATIVO'),
        defaultValue: "ATIVO",
    },
    role: {
        type: DataTypes.ENUM('ADM', 'USER'),
        allowNull: false
    }
}, {
    sequelize,
    tableName: "usuarios",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
});

export default Usuario
