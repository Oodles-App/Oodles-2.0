import prisma from "../../../db";
import { apiHandler } from "../../../helpers/api";
import getConfig from "next/config";

const jwt = require("jsonwebtoken");

const { serverRuntimeConfig } = getConfig();

export default apiHandler({
  delete: removeById,
});

//send a token so >:( mean >:( users can't delete random products with just ID
const removeById = async (req, res) => {
  const reqId = req.query.id;
  const { token } = req.body;
  console.log(reqId, "id in delete API route");
  verifyAuth(token, req.body.userId);
  await prisma.product.delete({
    where: { id: reqId },
  });
};

const verifyAuth = (token, productUserId) => {
  const verification = jwt.verify(token, serverRuntimeConfig.mySecret);
  if (verification.sub !== productUserId) {
    const error = { status: 401, message: "Unauthorized" };
    console.log(error, "error authorizing products manager");
    throw error;
  }
  return true;
};
