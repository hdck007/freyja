import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, skills } = JSON.parse(_req.body);
    await prisma.skill.deleteMany({
      where: {
        userId,
      },
    });
    console.log(skills);
    const newSkills = skills.map((item) => {
      return {
        name: item,
        userId,
      };
    });
    const generated = await prisma.skill.createMany({
      data: newSkills,
    });
    res.status(201).json(skills);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
