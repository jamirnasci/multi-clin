import { signOut } from "next-auth/react"
import { FaUserDoctor } from "react-icons/fa6"
import { IoCalendarOutline, IoPersonOutline } from "react-icons/io5"
import { MdOutlineMedicalServices, MdOutlinePayments } from "react-icons/md"

export default function SideBar() {
    const SIDEBAR_BTN_CLASS = "w-full text-left p-3 transition-colors duration-400 text-white hover:bg-white hover:text-blue-400 font-medium flex items-center cursor-pointer"
    return (
        <div className="h-[100vh] min-w-[220px] shadow-2xl flex flex-col justify-between bg-blue-600">
            <div className="flex items-start flex-col text-white">

                <h3 className="text-xl font-bold text-white mt-4 mb-4 ml-4">
                    Multi Clin
                </h3>
                <a className={SIDEBAR_BTN_CLASS} href="/agendamentos">
                    <span className="text-lg mr-3"> <IoCalendarOutline /></span> Agendamentos
                </a>
                <a className={SIDEBAR_BTN_CLASS} href="/pacientes">
                    <span className="text-lg mr-3"> <IoPersonOutline /></span> Pacientes
                </a>

                <a className={SIDEBAR_BTN_CLASS} href="/pagamentos">
                    <span className="text-lg mr-3"> <MdOutlinePayments /></span> Pagamentos
                </a>

                <a className={SIDEBAR_BTN_CLASS} href="/procedimentos">
                    <span className="text-lg mr-3"> <MdOutlineMedicalServices /></span> Procedimentos
                </a>

                <a className={SIDEBAR_BTN_CLASS} href="/colaboradores">
                    <span className="text-lg mr-3"> <FaUserDoctor /></span> Colaboradores
                </a>
            </div>
            <div className="flex justify-end w-full p-2">
                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg" onClick={()=>{
                    signOut()
                }}>Sair</button>
            </div>
        </div>
    )
}