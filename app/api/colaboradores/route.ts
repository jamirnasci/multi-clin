import { Colaborador } from "@/src/models/Colaborador";
import { NextResponse } from "next/server";

export async function GET() {
    const colaboradores = await Colaborador.findAll({raw: true})
    return NextResponse.json(colaboradores)
}