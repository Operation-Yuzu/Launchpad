import { readFile } from 'node:fs/promises';
import express from 'express';

import { prisma } from '../database/prisma.js';

import type { Event } from '../../types/Event.ts';

const router = express.Router();

async function getDummyData() {
  const dummyJson = await readFile('./data/dummydata.json', "utf8"); // relative to project root, apparently

  return JSON.parse(dummyJson);
}

router.get('/', async (req, res) => {
  try {
    const response = await getDummyData();

    const events: [Event] = response.data.items.map((event: Event) => {
      return {
        summary: event.summary,
        id: event.id,
        start: event.start,
        end: event.end
      }
    });

    res.status(200).send(events);

  } catch (error) {
    console.error('Failed to get calendar data:', error);
    res.sendStatus(500);
  }
});

// todo: fix any
// https://stackoverflow.com/questions/66312048/cant-override-express-request-user-type-but-i-can-add-new-properties-to-reques
router.get('/checkauth', async (req: any, res) => {
  if (req.user) {
    const numValidTokens = (await prisma.googleToken.findMany({where: {id: req.user.id, authCalendar: true}})).length;
    if (numValidTokens > 0) {
      res.status(200).send(true);
    } else {
      res.status(200).send(false);
    }
  } else {
    res.sendStatus(401);
  }
});

export default router;
