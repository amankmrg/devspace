import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    
    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        posts: {
          where: { public: true },
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            desc: true,
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
      posts: user.posts,
    });

  } catch (error) {
    console.error("Error fetching user posts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
