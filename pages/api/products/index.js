import prisma from "../../../db";
import { apiHandler } from "../../../helpers/api";

export default apiHandler({
  post: addProduct,
});

async function addProduct(req, res) {
  const product = req.body;
  product.amount = Number(product.amount);
  const newProduct = await prisma.product.create({
    data: product,
    include: {
      tags: true,
    },
  });
  console.log(newProduct, "new product api");
  return res.status(200).json(newProduct);
}
