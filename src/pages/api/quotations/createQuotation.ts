import { prisma } from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { quoteDetails } = req.body;

  const users = await prisma.customer.findMany();
  let userId: number = 0;
  users.forEach((user) => {
    if (user.customerEmail === quoteDetails.customer.customerEmail) {
      userId = user.id;
    }
  });

  try {
    await prisma.quotation.create({
      data: {
        customerId: userId,
      },
      include: {
        quotationItems: false,
        invoice: false,
        customer: false,
      },
    });
    res.status(200).json({ message: 'Quotation Created SUCCECCFULLY' });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: 'Quotation Creation FAILED' });
  }
}
