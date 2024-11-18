import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

// TO GET THE SPECIFIC DATA
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

// TO UPDATE THE USER
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // VALIDATE THE USER
  const body = await request.json();
  const validation = schema.safeParse(body);

  //   IF USER NAME DOES NOT EXIST
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  //   IF USER DOES NOT EXIST
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // WILL UPDATE THE USER
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  // UPDATE THE USER
  return NextResponse.json(updatedUser);
}

// TO DELETE THE USER
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // FETCH THE USER FROM A DB
  // IF NOT FOUND, RETURN 404

  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // DELETE THE USER
  const deleteUser = await prisma.user.delete({
    where: { id: user.id },
  });

  return NextResponse.json(deleteUser);
}
