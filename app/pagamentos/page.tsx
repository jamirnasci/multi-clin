'use client'
import { useState } from "react";
import SideBar from "../_components/sidebar/SideBar";

export default function PagamentosPage() {
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const [modalMode, setModalMode] = useState("create")
    
    return (
        <section className="flex flex-row flex-1">
            <SideBar/>
            <div className="flex-1">
                <h1>Pagamentos</h1>                
            </div>
        </section>
    )
}