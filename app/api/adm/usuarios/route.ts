import Usuario from "@/src/models/Usuario";
import { NextResponse } from "next/server";

export async function GET(){
    const usuarios = await Usuario.findAll()
    return NextResponse.json(usuarios)
}