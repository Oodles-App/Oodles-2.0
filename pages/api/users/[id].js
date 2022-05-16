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
  try {
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
        // tags: true,
      },
    });

    if (!user) throw 404;

    return res.status(200).json(user);
  } catch (error) {
    //TODO: make an user-specific error generator function and call it in error catches (?)
    if (error === 404) {
      error = { status: 404, message: "User not found." };
    } else if (error === 401) {
      error = { status: 401, message: "Not authorized." };
    } else {
      console.log(error);
      error = { ...error, status: 500, message: "Internal server error." };
    }

    res.status(error.status).send(error);
  }
}

async function update(req, res) {
  const reqId = parseInt(req.query.id);
  const data = req.body;

  const user = await prisma.user.update({
    where: { id: reqId },
    data: req.body,
  });

  //TODO: include validation?

  if (!user) throw "Error updating"; //TODO: update error handling

  return res.status(200).json(user);
}

function _delete(req, res) {
  usersRepo.delete(req.query.id);
  return res.status(200).json({});
}
