import express from 'express';

import { prisma } from '../database/prisma.js';

const router = express.Router();


// want to use this to be able to grab user's information for client side
router.get('/:id', async (req, res) => {
// TODO AUTH AUTH AUTH

    try {
        
    } catch (error) {

    }
});

router.post('/create', async (req, res) => {
  const { name }: { name: string} = req.body;

  try {
    await prisma.user.create({
      data: {
        name,
        credentialProvider: "",
        credentialSubject: 0
      }
    });

    console.log("Created user... hopefully");
    res.sendStatus(201);
  } catch (error) {
    console.error("Failed to create user:", error);
    res.sendStatus(500);
  }
});

export default router;