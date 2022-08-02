import type { NextApiRequest, NextApiResponse } from 'next';

const getUserById = (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ hello: req.query.id, message: 'User by ID' });
};

export default getUserById;
