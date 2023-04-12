import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "~/app/libs/prismadb";

export async function POST(requset: Request) {
  const body = await requset.json();
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { email, name, hashedPassword },
  });

  return NextResponse.json(user);
}
