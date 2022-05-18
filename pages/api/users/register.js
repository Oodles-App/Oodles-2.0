import prisma from "../../../db";
import { apiHandler } from "../../../helpers/api";

const bcrypt = require("bcryptjs");

export default apiHandler({
  post: register,
});

//TODO: improve error handling to include database-validation errors and more specific messages
async function register(req, res) {
  const { password, ...user } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (existingUser)
    throw { message: `Email already registered to an account.`, status: 409 };

  user.hash = bcrypt.hashSync(password, 10);

  const newUser = await prisma.user.create({ data: user });

  return res.status(201).json(newUser.data);
}
