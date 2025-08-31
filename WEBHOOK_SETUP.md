# Clerk Webhook Setup Guide

## Overview
This webhook automatically synchronizes user data between Clerk and your database when users sign up, update their profile, or delete their account.

## Setup Instructions

### 1. Deploy Your Application
Before setting up the webhook, make sure your application is deployed and accessible via a public URL (e.g., Vercel, Netlify, etc.).

### 2. Configure Clerk Webhook

1. **Go to Clerk Dashboard**
   - Visit [https://dashboard.clerk.com](https://dashboard.clerk.com)
   - Select your application

2. **Navigate to Webhooks**
   - In the sidebar, click on "Webhooks"
   - Click "Add Endpoint" button

3. **Configure Webhook Endpoint**
   - **Endpoint URL**: `https://your-domain.com/api/webhooks/clerk`
   - **Events to listen for**:
     - ✅ `user.created` - When a user signs up
     - ✅ `user.updated` - When a user updates their profile
     - ✅ `user.deleted` - When a user deletes their account

4. **Copy Webhook Secret**
   - After creating the webhook, Clerk will provide a signing secret
   - Copy this secret (it looks like: `whsec_...`)

### 3. Update Environment Variables

Add the webhook secret to your `.env` file:

```env
CLERK_WEBHOOK_SECRET=whsec_your_actual_secret_here
```

Replace `your_webhook_secret_here` with the actual secret from Clerk dashboard.

### 4. Test the Webhook

1. **Test User Creation**
   - Create a new user account in your app
   - Check your database to see if the user was automatically created

2. **Test User Updates**
   - Update user profile information in Clerk
   - Verify the changes are reflected in your database

3. **Check Webhook Logs**
   - In Clerk dashboard, go to Webhooks → Your Endpoint
   - View the delivery logs to see if webhooks are being sent successfully

## Webhook Events Handled

### user.created
- Automatically creates a new user record in your database
- Extracts name, email, and username from Clerk user data
- Prevents duplicate users if they already exist

### user.updated
- Updates existing user information in your database
- If user doesn't exist (edge case), creates them
- Syncs name, email, and username changes

### user.deleted
- Removes user and all their associated data (posts, projects)
- Cascading delete ensures data consistency

## Security Features

- **Webhook Verification**: Uses Svix to verify webhook authenticity
- **Environment Variables**: Webhook secret stored securely
- **Error Handling**: Comprehensive error handling and logging

## Troubleshooting

### Common Issues

1. **Webhook Secret Not Set**
   ```
   Error: No webhook secret found
   ```
   - Solution: Add `CLERK_WEBHOOK_SECRET` to your `.env` file

2. **Invalid Signature**
   ```
   Error verifying webhook
   ```
   - Solution: Ensure webhook secret matches Clerk dashboard

3. **Database Connection Issues**
   ```
   Error creating user in database
   ```
   - Solution: Check DATABASE_URL and database connectivity

### Testing Locally

For local development with ngrok or similar tools:

1. **Install ngrok** (if not already installed)
   ```bash
   npm install -g ngrok
   ```

2. **Expose local server**
   ```bash
   ngrok http 3000
   ```

3. **Use ngrok URL in Clerk**
   - Use the ngrok URL: `https://abc123.ngrok.io/api/webhooks/clerk`

## Files Created/Modified

- ✅ `/app/api/webhooks/clerk/route.ts` - Webhook endpoint
- ✅ `.env` - Added CLERK_WEBHOOK_SECRET
- ✅ `package.json` - Added svix dependency

## Next Steps

1. Deploy your application
2. Set up the webhook in Clerk dashboard
3. Update the environment variable with the real webhook secret
4. Test user registration to confirm everything works

The webhook will now automatically handle user synchronization between Clerk and your database!
