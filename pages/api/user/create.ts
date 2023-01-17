import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await prisma.user.create({
      data: {},
    });
    res.status(201).json({ ...user });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
