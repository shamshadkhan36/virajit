import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const lockId = params.id;

    const lock = await prisma.stockLock.update({
      where: { id: lockId },
      data: { status: "RELEASED" },
    });

    return NextResponse.json({
      success: true,
      message: "Lock manually released by Administrator.",
      lock,
    });
  } catch (error: any) {
    console.error("Admin release lock error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
