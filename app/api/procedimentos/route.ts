import { Procedimento } from "@/src/models/Procedimento";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const procedimentos = await Procedimento.findAll({ raw: true })
    return NextResponse.json(procedimentos)
}