import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const submission =
      await prisma.submission.create({
        data: {
          data: body,
        },
      });

    return NextResponse.json(submission);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 }
    );
  }
}