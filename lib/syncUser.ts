import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {prisma} from './prisma';




export default async function syncUser(){
    const user = await currentUser();

    if(!user){
        return null;
    }

    const loggedInUser = await prisma.user.findUnique({
        where: {id: user.id}
    });

    if(loggedInUser){
        return loggedInUser;
    }

    const newUser = await prisma.user.create({
        data:{
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.emailAddresses[0]?.emailAddress,

        }
    });

    console.log("New User updated Successfully: User's email id: ", user.emailAddresses[0]?.emailAddress);

    return newUser;

}