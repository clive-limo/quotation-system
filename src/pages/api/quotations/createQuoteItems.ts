import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const { itemName, itemPrice, itemQuantity } = req.body;

  const quoteIdAll = await prisma.quotation.findMany({
    select: {
      id: true,
    },
    orderBy: {
      dateCreated: 'desc',
    },
    take: 1,
  });

  const idArr = quoteIdAll.map((q) => q.id);
  const finalId = idArr[0];
  try {
    if (finalId) {
      await prisma.items.create({
        data: {
          quotationId: finalId,
          itemName,
          itemPrice,
          itemQuantity,
        },
      });
      res.status(200).json({ message: 'Items added SUCCECCFULLY' });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: 'Items added FAILED' });
  }
}
