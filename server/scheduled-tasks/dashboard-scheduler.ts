import cron from 'node-cron';

import { Prisma } from '../../generated/prisma/client.js'; // not sure about this, although it matches what was in database/prisma
import { User } from '../../generated/prisma/client.js'
import { prisma } from '../database/prisma.js';

cron.schedule('', () => {

})