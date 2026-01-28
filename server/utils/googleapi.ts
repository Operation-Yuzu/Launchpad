import { google } from 'googleapis';

import { prisma } from '../database/prisma.js';

export async function getGoogleOauth(userId: number) {
  const oauth2Client = new google.auth.OAuth2(
    process.env['GOOGLE_CLIENT_ID'],
    process.env['GOOGLE_CLIENT_SECRET'],
    process.env['GOOGLE_AUTH_REDIRECT_URL']
  );

  const token = await prisma.googleToken.findFirst({
    where: {
      accountId: userId,
      authCalendar: true
    }
  });

  if (!token) {return null};

  oauth2Client.setCredentials({
    access_token: token.access_token,
    id_token: token.id_token
  });

  return oauth2Client;
}

