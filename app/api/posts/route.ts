import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const mine = searchParams.get('mine');

        // If client requests own posts, include both private and public
        if (mine) {
            const user = await currentUser();
            if (!user) {
                return NextResponse.json({ message: 'Not Authorized', ok: false }, { status: 401 });
            }
            const posts = await prisma.posts.findMany({
                where: { userId: user.id },
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
                orderBy: { createdAt: 'desc' },
            });
            return NextResponse.json({ ok: true, posts }, { status: 200 });
        }

        // Public posts feed
        const posts = await prisma.posts.findMany({
            where: { public: true },
            select: {
                id: true,
                title: true,
                desc: true,
                public: true,
                content: true,
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
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ ok: true, posts }, { status: 200 });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Internal Server Error', ok: false }, { status: 500 });
    }
}


export const POST = async(request: Request) => {
    try{
        const user = await currentUser();
        if(!user){
            return NextResponse.json({message: "Not Authorized",ok:false},{status: 401});
        }
        const data = await request.json();
        const { title, desc, img, public: isPublic, content } = data;

        if (!title || !content) {
            return NextResponse.json({ error: "Title and content are required", ok: false }, { status: 400 });
        }
        const post = await prisma.posts.create({
            data:{
                title,
                desc,
                img,
                public: isPublic ?? false,
                content,
                userId:user.id
            }

        });
        return NextResponse.json({ok:true,post}, {status:201});

    }catch(error){
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'Internal Server Error', ok: false }, { status: 500 });
    }
   



}
