import jwt from 'jsonwebtoken';
import { prisma } from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.body) {
    res.status(404).json({ message: 'No data provided' });
    return;
  }
  const { email, password } = req.body;
  const SECRET_KEY = 'iMocQxjufnkqORjYbockL2cBlkwaISVW';

  const allUsers = await prisma.user.findMany({});

  const currentUser = allUsers.filter(
    (dbUsers) =>
      dbUsers.userEmail === email &&
      dbUsers.userPassword === password.userPassword
  );

  if (currentUser) {
    res.status(200).json({
      token: jwt.sign(
        {
          userEmail: email,
          userPassword: password,
        },
        SECRET_KEY,
        {
          expiresIn: '1d',
        }
      ),
    });
  }
}
