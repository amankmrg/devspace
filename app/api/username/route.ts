import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

export const POST = async(request: Request) => {
    try{
        const user = await currentUser();
        if(!user){
            return NextResponse.json({message: "Not Authorized",ok:false},{status: 401});
        }
        console.log('Hey request received');
        const data = await request.json();
        const { username } = data;

        if (!username) {
            return NextResponse.json({ error: "UserName is required", ok: false }, { status: 400 });
        }
        const res = await prisma.user.findUnique({
            where:{username}
        });

        if(res){
            console.log('Username Taken');
            return NextResponse.json({ok:true,taken:true}, {status:201});
        }
        const addUsername = await prisma.user.update({
            where:{id:user.id},
            data:{username}
        });

        return NextResponse.json({ok:true,taken:false}, {status:201});

    }catch(error){
        console.error('Error cre:', error);
        return NextResponse.json({ error: 'Internal Server Error', ok: false }, { status: 500 });
    }
   



}
