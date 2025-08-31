import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        detail: true,
        technology: true,
        img: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      },
    });
    if (!project) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ok: true, project }, { status: 200 });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Internal Server Error', ok: false }, { status: 500 });
  }
};

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ message: 'Not Authorized', ok: false }, { status: 401 });
    const { id } = await params;
    const existing = await prisma.project.findUnique({ where: { id }, select: { userId: true } });
    if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    if (existing.userId !== user.id) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

    const data = await request.json();
    const { title, detail, technology, img } = data;
    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(detail !== undefined && { detail }),
        ...(technology !== undefined && { technology }),
        ...(img !== undefined && { img }),
      },
      select: { id: true },
    });
    return NextResponse.json({ ok: true, project: updated }, { status: 200 });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Internal Server Error', ok: false }, { status: 500 });
  }
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ message: 'Not Authorized', ok: false }, { status: 401 });
    const { id } = await params;
    const existing = await prisma.project.findUnique({ where: { id }, select: { userId: true } });
    if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    if (existing.userId !== user.id) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Internal Server Error', ok: false }, { status: 500 });
  }
};
