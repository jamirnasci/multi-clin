import { sequelize } from '../db/Sequelize'
import './Agendamento'
import './Colaborador'
import './Paciente'
import './Pagamento'
import './Procedimento'
import './associations'

export async function syncDb(){
    await sequelize.sync();
}