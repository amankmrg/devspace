import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const GET = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
	try {
		const { id } = await params;
		const post = await prisma.posts.findUnique({
			where: { id },
			select: {
				id: true,
				title: true,
				desc: true,
				public: true,
				content: true,
				img: true,
				createdAt: true,
				updatedAt: true,
				user: {
					select: {
						id: true,
						name: true,
						username: true
					}
				}
			},
		});
		if (!post) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
		return NextResponse.json({ ok: true, post }, { status: 200 });
	} catch (error) {
		console.error('Error fetching post:', error);
		return NextResponse.json({ error: 'Internal Server Error', ok: false }, { status: 500 });
	}
};

export const PATCH = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
	try {
		const user = await currentUser();
		if (!user) return NextResponse.json({ message: 'Not Authorized', ok: false }, { status: 401 });

		const { id } = await params;
		const existing = await prisma.posts.findUnique({ where: { id }, select: { userId: true } });
		if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
		if (existing.userId !== user.id) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });

		const data = await request.json();
		const { title, desc, img, public: isPublic, content } = data;
		const updated = await prisma.posts.update({
			where: { id },
			data: {
				...(title !== undefined && { title }),
				...(desc !== undefined && { desc }),
				...(img !== undefined && { img }),
				...(isPublic !== undefined && { public: !!isPublic }),
				...(content !== undefined && { content }),
			},
			select: { id: true },
		});
		return NextResponse.json({ ok: true, post: updated }, { status: 200 });
	} catch (error) {
		console.error('Error updating post:', error);
		return NextResponse.json({ error: 'Internal Server Error', ok: false }, { status: 500 });
	}
};

export const DELETE = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
	try {
		const user = await currentUser();
		if (!user) return NextResponse.json({ message: 'Not Authorized', ok: false }, { status: 401 });
		const { id } = await params;
		const existing = await prisma.posts.findUnique({ where: { id }, select: { userId: true } });
		if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
		if (existing.userId !== user.id) return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
		await prisma.posts.delete({ where: { id } });
		return NextResponse.json({ ok: true }, { status: 200 });
	} catch (error) {
		console.error('Error deleting post:', error);
		return NextResponse.json({ error: 'Internal Server Error', ok: false }, { status: 500 });
	}
};