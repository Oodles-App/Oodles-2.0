//TODO: minimize PrismaClient creations (use redux, pass-down and/or export/import?)
// (prisma doesn't seem to like a bunch of clients running at once)
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");

import { apiHandler } from "../../../helpers/api";

export default apiHandler({
  get: getById,
  // put: update,
  // delete: _delete,
});

async function getById(req, res) {
  try {
    const { data: user } = await prisma.user.findUnique({
      where: { id: req.body.id },
      exclude: { hash: true },
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
      error = { ...error, status: 500, message: "Internal server error." };
      console.error(error);
    }
    res.status(error.status).send(error);
  }
}

function update(req, res) {
  const user = usersRepo.getById(req.query.id);

  if (!user) throw "User Not Found";

  // split out password from user details
  const { password, ...params } = req.body;

  // validate
  if (
    user.username !== params.username &&
    usersRepo.find((x) => x.username === params.username)
  )
    throw `User with the username "${params.username}" already exists`;

  // only update hashed password if entered
  if (password) {
    user.hash = bcrypt.hashSync(password, 10);
  }

  usersRepo.update(req.query.id, params);
  return res.status(200).json({});
}

function _delete(req, res) {
  usersRepo.delete(req.query.id);
  return res.status(200).json({});
}
