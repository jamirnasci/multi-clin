'use client'
import React, { JSX, ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";

interface ModalProps {
    Node: JSX.Element
    setModalVisible: Function
    title: string
}

export default function Modal(props: ModalProps) {
    return (
        <div className="fixed z-100 left-0 top-0 flex items-center justify-center w-screen h-screen bg-black/50">
            <div className="max-w-[1000px] bg-white p-8 rounded-lg shadow-xl">
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">
                        {props.title}
                    </h2>
                    <button className="flex items-center justify-center bg-red-400 rounded-[50%] text-white h-[35px] w-[35px] cursor-pointer" onClick={()=> props.setModalVisible()}>
                        <MdOutlineClose size={20} />
                    </button>
                </div>                
                {props.Node}

            </div>
        </div>
    )
}