import { Agendamento } from "./Agendamento";
import { Colaborador } from "./Colaborador";
import { Paciente } from "./Paciente";
import { Pagamento } from "./Pagamento";
import { Procedimento } from "./Procedimento";

Agendamento.belongsTo(Paciente, {
  foreignKey: "paciente_id",
});

Agendamento.belongsTo(Colaborador, {
  foreignKey: "colaborador_id",
});

Agendamento.belongsTo(Procedimento, {
  foreignKey: "procedimento_id",
});

Agendamento.hasMany(Pagamento, {
    foreignKey: 'agendamento_id'
})

Colaborador.hasMany(Agendamento, {
    foreignKey: 'colaborador_id'
})

Paciente.hasMany(Agendamento, {
    foreignKey: 'paciente_id'
})

Pagamento.belongsTo(Agendamento, {
    foreignKey: 'agendamento_id'
})

Procedimento.hasMany(Agendamento, {
    foreignKey: 'procedimento_id'
})