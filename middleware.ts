import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import syncUser from './lib/syncUser'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import {prisma} from '@/lib/prisma'


const isPublicRoute = createRouteMatcher(['/sign-in(.*)','/','/about','/contact','/api(.*)','/blog'])

export default clerkMiddleware(async (auth, req) => {
  // await syncUser();
  const { userId, redirectToSignIn } = await auth();
  
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn();
  }

  // console.log(userId);
  // const user = await prisma.user.findUnique({
  //   where: { id: userId || undefined },
  //   select: { username: true },
  // });
  // console.log(user);


})



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

