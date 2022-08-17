import { prisma } from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { customer } = req.body;

  try {
    await prisma.customer.create({
      data: {
        customerName: customer.customerName,
        customerEmail: customer.customerEmail,
      },
      include: {
        Quotation: false,
      },
    });
    res.status(200).json({ message: 'Customer created' });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: 'Customer creation failed' });
  }
}
