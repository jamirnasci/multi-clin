import { Procedimento } from "@/src/models/Procedimento";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const procedimento = await Procedimento.findByPk(id, { raw: true });

    return NextResponse.json(procedimento);
}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const rowsAffected = await Procedimento.destroy({
    where: {
      idprocedimento: id
    }
  });

  if (rowsAffected === 0) {
    return NextResponse.json(
      { success: false, msg: "Procedimento não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { success: true, msg: "Procedimento removido com sucesso" },
    { status: 200 }
  );
}