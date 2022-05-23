import prisma from "../../../db";
import { apiHandler } from "../../../helpers/api";
import getConfig from "next/config";

const jwt = require("jsonwebtoken");

const { serverRuntimeConfig } = getConfig();

export default apiHandler({
  delete: removeById,
  put: updateProduct,
});

async function removeById(req, res) {
  const reqId = parseInt(req.query.id);
  await prisma.product.delete({
    where: { id: reqId },
  });

  res.status(204).send();
}

async function updateProduct(req, res) {
  const productId = parseInt(req.query.id);
  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    include: {
      tags: true,
    },
    data: req.body,
  });

  res.status(200).json(updatedProduct);
}

//TODO: move verification into fetch wrapper for verifying tokens on certain routes?
const verifyAuth = (token, productUserId) => {
  const verification = jwt.verify(token, serverRuntimeConfig.mySecret);
  if (verification.sub !== productUserId) {
    const error = { status: 401, message: "Unauthorized" };
    console.log(error, "error authorizing products manager");
    throw error;
  }
  return true;
};
