import { FaUserDoctor } from "react-icons/fa6"
import { IoCalendarOutline, IoPersonOutline } from "react-icons/io5"
import { MdOutlineMedicalServices, MdOutlinePayments } from "react-icons/md"
import { PacienteSection } from "../sections/PacienteSection"
import { ColaboradorSection } from "../sections/ColaboradorSection"
import { ProcedimentoSection } from "../sections/ProcedimentoSection"

interface SideBarProps{
    changeSection: Function
}

export default function SideBar(props: SideBarProps) {
    const SIDEBAR_BTN_CLASS = "w-full text-left p-3 transition-colors duration-400 text-white hover:bg-white hover:text-blue-500 font-medium flex items-center cursor-pointer"
    return (
        <div style={{backgroundColor: 'var(--primary-color)'}} className="h-[100vh] min-w-[220px] shadow-2xl">
            <div className="flex items-start flex-col text-white">

                <h3 className="text-xl font-bold text-white mt-4 mb-4 ml-4">
                    Multi Clin
                </h3>
                <button className={SIDEBAR_BTN_CLASS}>
                    <span className="text-lg mr-3"> <IoCalendarOutline /></span> Agendamentos
                </button>
                <button className={SIDEBAR_BTN_CLASS} onClick={() => props.changeSection(()=> PacienteSection)}>
                    <span className="text-lg mr-3"> <IoPersonOutline /></span> Pacientes
                </button>

                <button className={SIDEBAR_BTN_CLASS}>
                    <span className="text-lg mr-3"> <MdOutlinePayments /></span> Pagamentos
                </button>

                <button className={SIDEBAR_BTN_CLASS} onClick={() => props.changeSection(()=> ProcedimentoSection)}>
                    <span className="text-lg mr-3"> <MdOutlineMedicalServices /></span> Procedimentos
                </button>

                <button className={SIDEBAR_BTN_CLASS} onClick={() => props.changeSection(()=> ColaboradorSection)}>
                    <span className="text-lg mr-3"> <FaUserDoctor /></span> Colaboradores
                </button>
            </div>
        </div>
    )
}