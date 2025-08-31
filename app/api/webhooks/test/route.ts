import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook endpoint is accessible',
    timestamp: new Date().toISOString(),
    status: 'ready'
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Test webhook received:', body);
    
    return NextResponse.json({ 
      message: 'Test webhook received successfully',
      receivedData: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing test webhook:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
}
