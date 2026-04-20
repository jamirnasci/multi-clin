import { NextApiRequest, NextApiResponse } from "next";
import { Paciente } from "@/src/models/Paciente"
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const pacientes = await Paciente.findAll({ raw: true })
    return NextResponse.json(pacientes)
}