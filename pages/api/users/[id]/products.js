import prisma from "../../../../db";
import { apiHandler } from "../../../../helpers/api";

export default apiHandler({
  get: getProductsByUser,
});

async function getProductsByUser(req, res) {
  const reqId = parseInt(req.query.id);
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
  console.log(userProducts, "userProducts in APi");
  return res.status(200).json(userProducts.products);
}
