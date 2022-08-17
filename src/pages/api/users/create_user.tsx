import { prisma } from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userData } = req.body;
  try {
    await prisma.user.create({
      data: {
        userEmail: userData.userEmail,
        userPassword: userData.userPassword,
        userStatus: userData.userStatus,
      },
    });
    res.status(200).json({ message: 'User Created' });
  } catch (error) {
    console.log('User Creation Failed');
  }
}
