import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const { quote } = req.body;

  try {
    await prisma.quotation.create({
      data:{
        
      }
    })
  }
}
