import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = await params;
    
    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        project: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            detail: true,
            technology: true,
            img: true,
            createdAt: true,
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
      projects: user.project,
    });

  } catch (error) {
    console.error("Error fetching user projects:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
