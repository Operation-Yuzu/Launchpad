import { readFile } from 'node:fs/promises';
import express from 'express';

// https://stackoverflow.com/questions/37688318/typescript-interface-possible-to-make-one-or-the-other-properties-required

interface EventBase {
  summary: string,
  id: string
}

interface AllDayTime {
  date: string,
  dateTime?: never,
  timeZone?: never
}

interface PartDayTime {
  date?: never,
  dateTime: string,
  timeZone: string
}

interface EventAllDay extends EventBase {
  start: AllDayTime
  end: AllDayTime
}

interface EventPartDay extends EventBase {
  start: PartDayTime
  end: PartDayTime
}

type Event = EventAllDay | EventPartDay;


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


export default router;
