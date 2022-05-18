import prisma from "../../../db";
import { apiHandler, errorHandler } from "../../../helpers/api";

const bcrypt = require("bcryptjs");

export default apiHandler({
  get: getById,
  put: update,
});

async function getById(req, res) {
  const reqId = parseInt(req.query.id);
  const user = await prisma.user.findUnique({
    where: { id: reqId },
    select: {
      id: true,
      email: true,
      businessName: true,
      address: true,
      contactNum: true,
      biography: true,
      imageUrl: true,
      tags: true,
    },
  });

  if (!user) {
    throw { message: "User not found.", status: 404 };
  }

  return res.status(200).json(user);
}

async function update(req, res) {
  const reqId = parseInt(req.query.id);

  const user = await prisma.user.update({
    where: { id: reqId },
    include: {
      tags: true,
    },
    data: req.body,
  });

  if (!user) throw { message: "User not found.", status: 404 };

  return res.status(200).json(user);
}
