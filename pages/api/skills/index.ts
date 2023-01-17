import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const skills = await prisma.skill.findMany({
      where: {
        userId: _req.body.userId,
      },
    });
    res.status(201).json(skills);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
