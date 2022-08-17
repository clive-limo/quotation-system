import { prisma } from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { quoteId } = req.body;
  try {
    await prisma.items.deleteMany({
      where: {
        quotationId: quoteId,
      },
    });
    await prisma.invoice.deleteMany({
      where: {
        quotationId: quoteId,
      },
    });
    await prisma.quotation.delete({
      where: {
        id: quoteId,
      },
    });
    res.status(200).json({ message: 'Quotation deleted Successfully' });
  } catch (error) {
    res.status(200).json({ message: 'Quotation not deleted' });
  }
}
