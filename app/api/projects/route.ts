import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

export const GET = async(req:Request)=>{

    try{
        const user = await currentUser();
        if(!user){
            return NextResponse.json({message:'Not Authorized' ,ok:false}, {status: 401});
        }
        
        const id = user.id;

        const res = await prisma.project.findMany({
            where:{userId:id},
            select:{
                id:true,
                title:true,
                detail:true,
                technology:true,
                img:true,
                createdAt:true
            },
            orderBy:{createdAt:'desc'}
        })

        return NextResponse.json({ok:true, res},{status:200});

    }catch(error){
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', ok: false }, { status: 500 });
    }



}


export const POST = async(req:Request)=>{

    try{
        const user = await currentUser();
        if(!user){
            return NextResponse.json({message:'Not Authorized' ,ok:false}, {status: 401});
        }
        
        const id = user.id;
        const data = await req.json();
        const {title,detail,technology,img} = data;
        if (!title || !detail) {
            return NextResponse.json({ error: "Title and detail are required", ok: false }, { status: 400 });
        }

        const post = await prisma.project.create({
            data:{
                title,
                detail,
                technology,
                img, 
                userId:id
            }

        });

        return NextResponse.json({ok:true,post}, {status:201});

        

    }catch(error){
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', ok: false }, { status: 500 });
    }



}