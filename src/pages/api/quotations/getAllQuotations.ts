import { prisma } from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const quotationsData = await prisma.quotations.findMany();
  res.json(quotationsData);
}
