const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");

import { apiHandler } from "../../../helpers/api";

export default apiHandler({
  post: register,
});

async function register(req, res) {
  // split out password from user details (security measure)
  const { password, ...user } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (existingUser)
    throw `An account has already been registered with this email, ${req.email}.`;

  // hash password
  user.hash = bcrypt.hashSync(password, 10);

  await prisma.user.create({ data: user });

  return res.status(200).json(user);
}
