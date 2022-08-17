import { prisma } from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { quoteId } = req.body;
  try {
    await prisma.quotation.update({
      where: {
        id: quoteId,
      },
      data: {
        quoteStatus: true,
        invoice: {
          create: {
            status: 0,
          },
        },
      },
    });
    res.status(200).json({ message: 'Quotation Updated Successfully' });
  } catch (error) {
    res.status(200).json({ message: 'Quotation not updated' });
  }
}
