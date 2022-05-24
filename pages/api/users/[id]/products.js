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
      products: {
        select: {
          id: true,
          name: true,
          amount: true,
          measurement: true,
          tags: true,
        },
      },
    },
  });

  if (!userProducts) {
    throw { message: "User not found.", status: 404 };
  }

  return res.status(200).json(userProducts.products);
}
