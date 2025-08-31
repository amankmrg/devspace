import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        user: {
          username: "amankmrg"
        }
      },
      select: {
        id: true,
        title: true,
        detail: true,
        technology: true,
        img: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 6 // Show latest 6 projects
    });

    return NextResponse.json({ 
      ok: true, 
      projects 
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      ok: false,
      projects: []
    }, { status: 500 });
  }
}
