import jwt from 'jsonwebtoken';
import { prisma } from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const SECRET_KEY = 'iMocQxjufnkqORjYbockL2cBlkwaISVW';

  const currentUser = await prisma.user.findMany({
    where: {
      userEmail: email,
      userPassword: password,
    },
  });
  console.log(currentUser);

  if (currentUser.length !== 0) {
    res.status(200).json({
      token: jwt.sign(
        {
          userEmail: email,
          userPassword: password,
        },
        SECRET_KEY,
        {
          expiresIn: '3d',
        }
      ),
    });
  } else res.status(300).json({ message: 'Login Failed' });
}
