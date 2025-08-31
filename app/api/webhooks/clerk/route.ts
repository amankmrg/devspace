import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { prisma } from '@/lib/prisma';

type EventType = 'user.created' | 'user.updated' | 'user.deleted';

interface ClerkUser {
  id: string;
  first_name: string;
  last_name: string;
  email_addresses: Array<{
    email_address: string;
    id: string;
  }>;
  username?: string;
}

interface WebhookEvent {
  type: EventType;
  data: ClerkUser;
}

export async function POST(req: NextRequest) {
  // Get the headers
  const svix_id = req.headers.get('svix-id');
  const svix_timestamp = req.headers.get('svix-timestamp');
  const svix_signature = req.headers.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  
  try {
    switch (eventType) {
      case 'user.created':
        await handleUserCreated(evt.data);
        break;
      case 'user.updated':
        await handleUserUpdated(evt.data);
        break;
      case 'user.deleted':
        await handleUserDeleted(evt.data);
        break;
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
}

async function handleUserCreated(userData: ClerkUser) {
  try {
    const { id, first_name, last_name, email_addresses, username } = userData;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (existingUser) {
      console.log(`User ${id} already exists in database`);
      return;
    }

    // Create user in database
    const newUser = await prisma.user.create({
      data: {
        id,
        name: `${first_name || ''} ${last_name || ''}`.trim(),
        email: email_addresses[0]?.email_address || '',
        username: username || null,
      },
    });

    console.log(`User created in database: ${newUser.email}`);
  } catch (error) {
    console.error('Error creating user in database:', error);
    throw error;
  }
}

async function handleUserUpdated(userData: ClerkUser) {
  try {
    const { id, first_name, last_name, email_addresses, username } = userData;
    
    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: `${first_name || ''} ${last_name || ''}`.trim(),
        email: email_addresses[0]?.email_address || '',
        username: username || null,
      },
    });

    console.log(`User updated in database: ${updatedUser.email}`);
  } catch (error: any) {
    console.error('Error updating user in database:', error);
    // If user doesn't exist, create them
    if (error.code === 'P2025') {
      await handleUserCreated(userData);
    } else {
      throw error;
    }
  }
}

async function handleUserDeleted(userData: ClerkUser) {
  try {
    const { id } = userData;
    
    // Delete user's posts and projects first (cascade)
    await prisma.posts.deleteMany({
      where: { userId: id }
    });
    
    await prisma.project.deleteMany({
      where: { userId: id }
    });
    
    // Then delete the user
    await prisma.user.delete({
      where: { id }
    });

    console.log(`User ${id} deleted from database`);
  } catch (error) {
    console.error('Error deleting user from database:', error);
    throw error;
  }
}
