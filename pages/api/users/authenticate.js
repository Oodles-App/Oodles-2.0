import getConfig from "next/config";
import { apiHandler } from "../../../helpers/api";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { serverRuntimeConfig } = getConfig();

export default apiHandler({
  post: authenticate,
});

async function authenticate(req, res) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email: email } });

  // validate
  if (!(user && bcrypt.compareSync(password, user.hash))) {
    throw "Username or password is incorrect";
  }

  // create a jwt token that is valid for 7 days
  const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.mySecret, {
    expiresIn: "7d",
  });

  // return basic user details and token
  return res.status(200).json({
    id: user.id,
    email: user.email,
    businessName: user.businessName,
    businessType: user.businessType,
    token,
  });
}
