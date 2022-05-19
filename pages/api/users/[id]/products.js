import prisma from "../../../../db";
import { apiHandler } from "../../../../helpers/api";

export default apiHandler({
  get: getProductsByUser,
});

const getProductsByUser = async (req, res) => {
  const userId = req.query.id;
  const userProducts = await prisma.user.findUnique({
    where: { id: reqId },
    select: {
      products: true,
    },
  });
  //TODO: this is not DRY :(
  if (!userProducts) {
    throw { message: "User not found.", status: 404 };
  }
  return res.status(200).json(userProducts);
};
