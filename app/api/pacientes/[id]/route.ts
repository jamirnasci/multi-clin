import { NextResponse } from "next/server";
import { Paciente } from "@/src/models/Paciente";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const paciente = await Paciente.findByPk(id, { raw: true });

    return NextResponse.json(paciente);
}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const rowsAffected = await Paciente.destroy({
    where: {
      idpaciente: id
    }
  });

  if (rowsAffected === 0) {
    return NextResponse.json(
      { success: false, msg: "Paciente não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { success: true, msg: "Paciente deletado com sucesso" },
    { status: 200 }
  );
}