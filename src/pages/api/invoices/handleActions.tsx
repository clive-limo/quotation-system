import { prisma } from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { invoiceId } = req.body;

  try {
    await prisma.invoice.update({
      where: {
        id: invoiceId,
      },
      data: {
        status: 1,
      },
    });
    res.status(200).json({ message: 'Quotation Updated Successfully' });
  } catch (error) {
    res.status(200).json({ message: 'Quotation not updated' });
  }
}
