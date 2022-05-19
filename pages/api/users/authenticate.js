import getConfig from "next/config";
import { apiHandler } from "../../../helpers/api";
import prisma from "../../../db";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { serverRuntimeConfig } = getConfig();

export default apiHandler({
  post: authenticate,
});

async function authenticate(req, res) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email: email } });

    // validate
    if (!(user && bcrypt.compareSync(password, user.hash))) {
      const error = new Error();
      error.message = "Incorrect username or password.";
      error.status = 401;
      throw error;
    }

    // create a jwt token that is valid for 2d
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.mySecret, {
      expiresIn: "2d",
    });

    // return basic user details and token
    return res.status(200).json({
      id: user.id,
      businessType: user.businessType,
      token,
    });
  } catch (error) {
    res.status(error.status).send(error);
  }
}
