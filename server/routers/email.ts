import express from 'express';
import { google } from 'googleapis';

import { getGoogleOauth } from '../utils/googleapi.js'

const email = express.Router();

email.get('/', async (req: any, res) => {
  const userId = req.user?.id;

  if (userId === undefined) {
    res.sendStatus(401);
    return;
  }

  try {
    const oauth2Client = await getGoogleOauth(userId, 'gmail');

    if (oauth2Client === null) { // no token for this user
      res.sendStatus(401);
      return;
    }

    const gmail = google.gmail({version: 'v1', auth: oauth2Client});

    const result = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10
    });

    const emails = result.data.messages;

    res.status(200).send(emails);

  } catch (error) {
    console.error('Failed to fetch emails:', error);
    res.sendStatus(500);
  }
});

export default email;