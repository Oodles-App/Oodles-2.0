//TODO: minimize PrismaClient creations (use redux, pass-down and/or export/import?)
// (prisma doesn't seem to like a bunch of clients running at once)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");

import { apiHandler } from "../../../helpers/api";

export default apiHandler({
  get: getById,
  put: update,
  // delete: _delete,
});

async function getById(req, res) {
  // try {
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
  // } catch (error) {
  //   if (error.status === 401) {
  //     error.message = "Not authorized.";
  //   } else if (error.status === 500) {
  //     error.message = "Internal server error.";
  //   }
  //   console.log(error, "error");
  //   res.status(error.status).send(error);
  // }
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

  //TODO: include validation?

  if (!user) {
    const error = new Error();
    error.message = "User not found.";
    error.status = 404;
    throw error;
  }

  return res.status(200).json(user);
}

function _delete(req, res) {
  usersRepo.delete(req.query.id);
  return res.status(200).json({});
}
